import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout';
import { FeedConfigSchema, FeedSchema } from '../../utils/rssValidator';
import type { z } from 'zod';
import Parser from 'rss-parser';
import useIsBrowser from '@docusaurus/useIsBrowser';

// --- Type Definitions ---
type FeedConfig = z.infer<typeof FeedConfigSchema>;
type Feed = z.infer<typeof FeedSchema>;
type ParsedItem = { 
  title: string;
  link: string;
  isoDate: string;
  contentSnippet: string;
};
type FeedItem = { feed: Feed; item: ParsedItem };

const RSS_CONFIG_PATH = '/data/rss-feeds.json';
const CACHE_KEY = 'rss-hub-cache';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// --- Helper Components ---

const SkeletonCard: React.FC = () => (
  <div className="card margin-bottom--lg">
    <div className="card__header">
      <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: '0.5rem' }} />
      <div className="skeleton" style={{ height: 14, width: '40%' }} />
    </div>
    <div className="card__body">
      <div className="skeleton" style={{ height: 16, width: '90%', marginBottom: '0.5rem' }} />
      <div className="skeleton" style={{ height: 16, width: '80%' }} />
    </div>
  </div>
);

const FeedError: React.FC<{ feedName: string; error: Error }> = ({ feedName, error }) => (
  <div className="card card--danger margin-bottom--lg">
    <div className="card__header">
      <h3>Error loading: {feedName}</h3>
    </div>
    <div className="card__body">
      <p>This feed could not be loaded. It might be temporarily unavailable or the URL may be incorrect.</p>
      {process.env.NODE_ENV === 'development' && (
        <details>
          <summary>Error Details</summary>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
        </details>
      )}
    </div>
  </div>
);

// --- Main Logic ---

const RssHubPage: React.FC = () => {
  const isBrowser = useIsBrowser();
  const [config, setConfig] = useState<FeedConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isBrowser) return;

    const fetchConfig = async () => {
      try {
        // First try to use the sample config
        if (process.env.NODE_ENV === 'development') {
          console.log('Using sample RSS feed configuration');
          const sampleConfig: FeedConfig = {
            feeds: [
              {
                id: 'docusaurus-blog',
                url: 'https://docusaurus.io/blog/rss.xml',
                name: 'Docusaurus Blog',
                category: 'official',
                enabled: true,
                maxItems: 5
              },
              {
                id: 'react-blog',
                url: 'https://react.dev/blog/rss.xml',
                name: 'React Blog',
                category: 'javascript-frameworks',
                enabled: true,
                maxItems: 3
              }
            ]
          };
          setConfig(sampleConfig);
          setLoading(false);
          return;
        }

        // In production, try to fetch from the configured path
        const response = await fetch(RSS_CONFIG_PATH);
        const responseText = await response.text();
        
        // Check if the response is HTML (which would indicate an error)
        if (responseText.trim().startsWith('<!DOCTYPE') || !response.ok) {
          throw new Error(`Received HTML response. This usually means the file was not found at ${RSS_CONFIG_PATH}`);
        }
        
        // Try to parse as JSON
        const data = JSON.parse(responseText);
        const validatedConfig = FeedConfigSchema.parse(data);
        setConfig(validatedConfig);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ 
          data: validatedConfig, 
          timestamp: Date.now() 
        }));
      } catch (err) {
        console.error('Failed to load feed configuration:', err);
        setError(err as Error);
        
        // Try to use cached config
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
              console.log('Using cached feed configuration');
              setConfig(data);
              setError(null); // Clear error if cache is valid
            }
          }
        } catch (cacheError) {
          console.error('Failed to read from cache:', cacheError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [isBrowser]);

  const enabledFeeds = useMemo(() => config?.feeds.filter(f => f.enabled) ?? [], [config]);

  return (
    <Layout title="RSS Hub" description="An aggregation of external RSS feeds.">
      <main className="container margin-vert--lg">
        <h1>RSS Hub</h1>
        <p>A collection of interesting feeds from around the web.</p>
        
        {loading && <p>Loading feed configuration...</p>}
        
        {error && !config && (
          <div className="alert alert--danger"> 
            <h4>Failed to Load Feeds</h4>
            <p>The feed configuration could not be loaded. Please try again later.</p>
            {process.env.NODE_ENV === 'development' && <p>{error.message}</p>}
          </div>
        )}

        {enabledFeeds.length > 0 && <FeedContainer feeds={enabledFeeds} />}
      </main>
    </Layout>
  );
};

const FeedContainer: React.FC<{ feeds: Feed[] }> = ({ feeds }) => {
  const [allItems, setAllItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, Error>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const parser = new Parser();
    const fetchAll = async () => {
      setLoading(true);
      const feedPromises = feeds.map(async (feed) => {
        try {
          // Docusaurus can proxy requests to avoid CORS issues.
          // Prepending with '/__docusaurus/proxy?url=' is a common pattern.
          // For simplicity, we rely on a browser extension or a proper CORS proxy for dev.
          const parsedFeed = await parser.parseURL(feed.url);
          return parsedFeed.items
            .slice(0, feed.maxItems)
            .map(item => ({ feed, item: item as ParsedItem }));
        } catch (error) {
          setErrors(prev => ({ ...prev, [feed.id]: error as Error }));
          return [];
        }
      });

      const results = await Promise.all(feedPromises);
      const flattenedItems = results.flat();
      flattenedItems.sort((a, b) => new Date(b.item.isoDate).getTime() - new Date(a.item.isoDate).getTime());
      setAllItems(flattenedItems);
      setLoading(false);
    };

    fetchAll();
  }, [feeds]);

  const categories = useMemo(() => ['all', ...new Set(feeds.map(f => f.category).filter(Boolean))], [feeds]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return allItems;
    return allItems.filter(item => item.feed.category === selectedCategory);
  }, [allItems, selectedCategory]);

  return (
    <div>
      <div className="margin-bottom--md">
        <label htmlFor="category-filter" style={{ marginRight: '1rem' }}>Filter by category:</label>
        <select 
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {Object.entries(errors).map(([feedId, error]) => {
        const feed = feeds.find(f => f.id === feedId);
        return feed ? <FeedError key={feedId} feedName={feed.name} error={error} /> : null;
      })}

      {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}

      {!loading && filteredItems.map(({ feed, item }, index) => (
        <div key={`${feed.id}-${index}`} className="card margin-bottom--lg">
          <div className="card__header">
            <h3><a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a></h3>
            <small>
              From {feed.name} • {new Date(item.isoDate).toLocaleString()}
              {feed.category && <span className="badge badge--secondary margin-left--sm">{feed.category}</span>}
            </small>
          </div>
          <div className="card__body">
            <p>{item.contentSnippet}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RssHubPage;

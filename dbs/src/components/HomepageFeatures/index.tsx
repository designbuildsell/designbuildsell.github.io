import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Design',
    Svg: require('@site/static/img/CityDesign.svg').default,
    description: (
      <>
        How to Design.
      </>
    ),
  },
  {
    title: 'Build',
    Svg: require('@site/static/img/CityScene.svg').default,
    description: (
      <>
        How to Build.
      </>
    ),
  },
  {
    title: 'Sell',
    Svg: require('@site/static/img/CitySkyline.svg').default,
    description: (
      <>
        How to Sell.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

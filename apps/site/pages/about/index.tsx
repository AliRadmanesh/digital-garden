import { GetStaticProps } from 'next';
import styles from './index.module.css';

export interface AboutProps {
  name: string;
}

export function About({ name }: AboutProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome {name}!</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: 'Ali',
    },
  };
};

export default About;

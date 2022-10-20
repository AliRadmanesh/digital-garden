import { GetStaticProps } from 'next';

export interface AboutProps {
  name: string;
}

export function About({ name }: AboutProps) {
  return (
    <div>
      <h1 className="text-3xl text-red-500">Welcome {name}!</h1>
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

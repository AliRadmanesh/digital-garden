import { join } from 'path';
import { readdirSync } from 'fs';

export interface PostProps {
  params: { slug: string };
}

export const dynamicParams = false;

const POSTS_PATH = join(process.cwd(), '_posts');

export async function generateStaticParams() {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ slug }));

  return paths;
}

export default function Post({ params }: PostProps) {
  return (
    <div>
      <h1>Welcome to Post {params.slug}!</h1>
    </div>
  );
}

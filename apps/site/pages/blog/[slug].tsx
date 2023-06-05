import dynamic from 'next/dynamic';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote } from 'next-mdx-remote';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@digital-garden/markdown';

export interface PostProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube: dynamic(
    async () =>
      await import('@digital-garden/shared/mdx-elements/youtube/youtube')
  ),
  a: dynamic(
    async () =>
      await import(
        '@digital-garden/shared/mdx-elements/custom-link/custom-link'
      )
  ),
};

const POSTS_PATH = join(
  process.cwd(),
  process.env.articleMarkdownPath || '_posts'
);

export function Post({
  frontMatter,
  html,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>
      <hr />
      <MDXRemote {...html} components={mdxElements} />
    </div>
  );
}

export const getStaticProps = async ({ params }: { params: PostProps }) => {
  // Parse the content of our markdown and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // Convert markdown content => HTML
  const renderHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;

import { GetStaticPaths, GetStaticProps } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@digital-garden/markdown';
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';

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

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

export function Article({ frontMatter, html }) {
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

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
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

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;

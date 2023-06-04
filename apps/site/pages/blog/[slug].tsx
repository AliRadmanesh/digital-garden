import { GetStaticPaths, GetStaticProps } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@digital-garden/markdown';
import dynamic from 'next/dynamic';

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

const POSTS_PATH = join(process.cwd(), '_posts');

export function Post({
  frontMatter,
  html,
}: {
  frontMatter: { title: string; author: { name: string } };
  html: MDXRemoteSerializeResult;
}) {
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

// TODO: fix the type-checking
export const getStaticProps: GetStaticProps<PostProps> = async ({
  params,
}: {
  params: PostProps;
}) => {
  // 1. parse the content of our markdown and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // 2. convert markdown content => HTML
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

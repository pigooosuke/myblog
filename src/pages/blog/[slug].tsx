import type { ReactElement } from "react";
import { GetStaticPropsContext } from "next";
import { getPost, getPosts, getPostContent } from "@/lib/notion/client";
import { Post, BaseBlock } from "@/types/blog";
import ArticleContent from "@/components/blogs/article";
import ArticleHeader from "@/components/blogs/articleHeader";
import { compact } from "lodash";
import styles from "@/styles/article.module.css";
import { LayoutMain } from "@/layout/main";
import { uploadAssetsFromBlocks } from "@/lib/next-notion-s3-assets";
import CommonMeta from "@/components/meta/CommonMeta";
import { buildPost } from "@/lib/notion/client";

interface Props {
  postId: string;
  post: Post;
  postContent: BaseBlock[];
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // Grab the slug from the post URL
  const slug = context.params && context.params.slug;
  // Get all posts from the Notion database
  const posts = await getPosts();
  // Find the post with a matching slug property
  const matchedPost = posts.filter((post) => {
    if (post && post.properties && post.properties.slug) {
      return post.properties.slug.rich_text?.[0].plain_text === slug;
    }
  })[0];
  // Get the Notion page data and all child block data
  const [postData, postContent] = await Promise.all([
    getPost(matchedPost.id),
    getPostContent(matchedPost.id),
  ]);
  // upload asset
  // uploadAssetsFromBlocks(postContent);
  // Next.js passes the data to my React template for rendering

  let post = buildPost(postData);

  return {
    props: {
      postId: matchedPost.id,
      post,
      postContent,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const posts = await getPosts();
  const postSlugs = compact(
    posts.map((post) => {
      if (
        post.properties &&
        post.properties.slug &&
        post.properties.slug.rich_text
      ) {
        return `/blog/${post.properties.slug.rich_text[0].plain_text}`;
      }
    })
  );
  return {
    paths: postSlugs,
    fallback: "blocking",
  };
};

const Article = ({ postId, post, postContent }: Props) => {
  if (!postId) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }
  return (
    <>
      <CommonMeta title={post.title} description={post.description} />
      <div className={styles.article}>
        <ArticleHeader post={post} />
        <ArticleContent postContent={postContent} />
      </div>
    </>
  );
};

Article.getLayout = (page: ReactElement) => (
  <>
    <LayoutMain>{page}</LayoutMain>
  </>
);

export default Article;

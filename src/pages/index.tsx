import type { ReactElement } from "react";
import { BlogListView } from "@/components/blogs/blogListView";
import { getPosts } from "@/lib/notion/client";
import { buildPost, collectList } from "@/lib/notion/client";
import { QueryDatabaseResponseRecord, Post } from "@/types/blog";
import generateRSSFeed from "@/lib/feed";
import { LayoutMain } from "@/layout/main";
import styles from "@/styles/index.module.css";
import { GetStaticPropsContext } from "next";

export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = await getPosts();
  let post_lists = collectList(posts).map(
    (block: QueryDatabaseResponseRecord) => buildPost(block)
  );
  // generate rss feed
  !context.preview && generateRSSFeed(post_lists);

  return {
    props: {
      post_lists,
      preview: Boolean(context.preview),
    },
    revalidate: 60,
  };
}

const Home = ({
  post_lists = [],
}: {
  post_lists: QueryDatabaseResponseRecord[];
}) => {
  return (
    <>
      <div className={styles.contents}>
        {post_lists.map((post: Post) => {
          return <BlogListView post={post} key={post.slug} />;
        })}
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <LayoutMain>{page}</LayoutMain>;

export default Home;

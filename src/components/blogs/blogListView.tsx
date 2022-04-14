import Link from "next/link";
import styles from "@/styles/blogItem.module.css";
import { Post } from "@/types/blog";

export const BlogListView = ({ post }: { post: Post }) => {
  return (
    <div className={styles.blogItem}>
      <div className={styles.blogItemMain}>
        <div className={styles.blogItemContents}>
          <div className={styles.blogItemDate}>
            <span>{post.created}</span>
          </div>
          <div className={styles.blogItemTitle}>
            <Link href={`/blog/${encodeURIComponent(post.slug)}`} passHref>
              <a>{post.title}</a>
            </Link>
          </div>
          <div className={styles.blogItemDescription}>
            <span>{post.description}</span>
          </div>
          <div className={styles.blogItemTags}>
            <ul>
              {post.tags.map((item: string) => {
                return <li key={item}>#{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

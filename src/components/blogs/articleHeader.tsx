import { Post } from "@/types/blog";
import styles from "@/styles/article.module.css";

const ArticleHeader = ({ post }: { post: Post }) => {
  return <h1 className={styles.header_title}>{post.title}</h1>;
};
export default ArticleHeader;

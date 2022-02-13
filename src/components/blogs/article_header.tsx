import { BaseBlock } from '@/types/blog';
import styles from '@/styles/article.module.css'
import { buildPost } from '@/lib/notion/client'

const ArticleHeader = ({ postData }: { postData: BaseBlock }) => {
    let post = buildPost(postData)
    return (
        <>
            <h1 className={styles.header_title}>{post.title}</h1>
        </>
    )
}
export default ArticleHeader

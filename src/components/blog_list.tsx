import Link from 'next/link'
import styles from '@/styles/blogItem.module.css'
import { QueryDatabaseResponseRecord, BaseBlock } from '@/types/blog'
import { buildPost, collectList } from '@/lib/notion/client'


export const BlogList = ({ posts }: { posts: QueryDatabaseResponseRecord[] }) => {
    return collectList(posts).map((block: QueryDatabaseResponseRecord) => buildPost(block)).map((block: BaseBlock, i: number) =>
        <>
            <div className={styles.blogItem} key={block.page_id}>
                <div className={styles.blogItemMain}>
                    <div className={styles.blogItemContents}>
                        <div className={styles.blogItemDate}>
                            <span>{block.created}</span>
                        </div>
                        <Link href={`/blog/${encodeURIComponent(block.slug)}`} passHref>
                            <div className={styles.blogItemTitle}>
                                <span><a>{block.title}</a></span>
                            </div>
                        </Link>
                        <div className={styles.blogItemDescription}>
                            <span>{block.description}</span>
                        </div>
                        <div className={styles.blogItemTags}>
                            <ul>
                                {
                                    block.tags.map((item: string) => { return (<li key={item}>#{item}</li>) })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

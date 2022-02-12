import { GetStaticPropsContext } from "next";
import { getPost, getPosts, getPostContent } from '@/lib/notion/client'
import { QueryDatabaseResponseResults, ListBlockChildrenResponseResults } from '@/types/blog'
import ArticleContent from '@/components/blogs/article'
import { compact } from "lodash"
import styles from "@/styles/article.module.css"


interface Props {
    postId: string;
    postData: QueryDatabaseResponseResults;
    postContent: ListBlockChildrenResponseResults;
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
    // Grab the slug from the post URL
    const slug = context.params && context.params.slug
    // Get all posts from the Notion database
    const posts = await getPosts()
    // Find the post with a matching slug property
    const matchedPost = posts.filter((post) => {
        if (post && post.properties && post.properties.slug) {
            return post.properties.slug.rich_text?.[0].plain_text === slug
        }
    })[0]
    // Get the Notion page data and all child block data
    const [postData, postContent] = await Promise.all([
        getPost(matchedPost.id),
        getPostContent(matchedPost.id),
    ])
    // Next.js passes the data to my React template for rendering
    return {
        props: {
            postId: matchedPost.id,
            postData,
            postContent,
        },
        revalidate: 60,
    }
}

export const getStaticPaths = async () => {
    const posts = await getPosts()
    const postSlugs = compact(
        posts.map((post) => {
            if (
                post.properties &&
                post.properties.slug &&
                post.properties.slug.rich_text
            ) {
                return `/blog/${post.properties.slug.rich_text[0].plain_text}`
            }
        })
    )
    return {
        paths: postSlugs,
        fallback: "blocking",
    }
}


const Post = ({ postId, postData, postContent }: Props) => {
    if (!postId) {
        return {
            notFound: true,
            revalidate: 30,
        }
    }
    return (
        <>
            <div className={styles.article}>
                {/* <ArticleMeta postData={postData} /> */}
                <ArticleContent postContent={postContent} />
            </div >
        </>
    );
}
export default Post;

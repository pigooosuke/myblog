import { BlogListView } from '@/components/blogs/blogListView'
import { getPosts } from '@/lib/notion/client'
import { buildPost, collectList } from '@/lib/notion/client'
import { QueryDatabaseResponseRecord, Post } from '@/types/blog'
import generateRSSFeed from '@/lib/feed'

export async function getStaticProps() {
  const posts = await getPosts()
  let post_lists = collectList(posts).map((block: QueryDatabaseResponseRecord) => buildPost(block))
  // generate rss feed
  generateRSSFeed(post_lists)

  return {
    props: {
      post_lists
    }
  }
}

const Home = ({ post_lists = [] }) => {
  return (
    <>
      {post_lists.map((post: Post) => {
        return (<BlogListView post={post} key={post.slug} />)
      })}
    </>
  )
}

export default Home

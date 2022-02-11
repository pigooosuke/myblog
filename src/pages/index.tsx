import { BlogList } from '@/components/blog_list'
import { getPosts } from '@/lib/notion/client'

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: {
      posts
    }
  }
}

const Home = ({ posts = [] }) => {
  return (
    <>
      <BlogList posts={posts} />
    </>
  )
}

export default Home

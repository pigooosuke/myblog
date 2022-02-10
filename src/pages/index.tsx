import { NoteList } from '@/components/notes'
import { queryDatabase } from '@/lib/notion/client'

export async function getStaticProps() {
  const notes = await queryDatabase()
  return {
    props: {
      notes
    }
  }
}

const Home = ({ notes = [] }) => {
  return (
    <>
      <NoteList notes={notes} />
    </>
  )
}

export default Home

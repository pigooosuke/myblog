import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from 'querystring';
import { getNote, getAllNotes, getBlocks, collectList } from '@/lib/notion/client'
import { Note, BlockRecord } from '@/types/note'
import Article from '@/components/article'

interface Props {
    note: Note;
    blocks: BlockRecord[];
}

interface Params extends ParsedUrlQuery {
    page_id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const note = await getNote(params!.page_id)
    if (!note) {
        return {
            notFound: true,
            revalidate: 30,
        }
    }
    let blocks = await getBlocks(note.page_id)
    blocks = collectList(blocks)
    return {
        props: {
            note,
            blocks,
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const notes = await getAllNotes()
    return {
        paths: notes.map((note: Note) => getNoteLink(note.page_id)),
        fallback: 'blocking',
    }
}

export const getNoteLink = (page_id: string) => {
    return `/note/${page_id}`
}

const Post = ({ note, blocks = [] }: Props) => {
    if (!note) {
        return {
            notFound: true,
            revalidate: 30,
        }
    }
    return (
        <div>
            <Article blocks={blocks} />
        </div >
    );
}
export default Post;

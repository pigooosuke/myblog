import NotionBlock from '@/components/notion-blocks'
import { BlockRecord } from '@/types/note';


const Article = ({ blocks }: { blocks: BlockRecord[] }) => {
    const blocksList = blocks.map((block: BlockRecord, i: number) => {
        return (
            <NotionBlock block={block} key={`block-${block.id}`} />
        )
    })
    return (<>{blocksList}</>);
}
export default Article

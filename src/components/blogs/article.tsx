import { NotionBlock } from '@/components/blocks/notionBlocks'
import { BaseBlock, ListBlockChildrenResponseResults } from '@/types/blog';
import { collectList } from '@/lib/notion/client'

const ArticleContent = ({ postContent }: { postContent: ListBlockChildrenResponseResults }) => {
    return collectList(postContent).map((block: BaseBlock, i: number) =>
        <NotionBlock block={block} key={`block-${block.id}-${i}`} />
    )
}
export default ArticleContent

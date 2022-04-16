import { NotionBlock } from "@/components/blocks/notionBlocks";
import { BaseBlock } from "@/types/blog";
import { collectList } from "@/lib/notion/client";

const ArticleContent = ({ postContent }: { postContent: BaseBlock[] }) => {
  return collectList(postContent).map((block: BaseBlock, i: number) => (
    <NotionBlock block={block} key={`block-${block.id}-${i}`} />
  ));
};
export default ArticleContent;

import React from "react";
import { BaseBlock, RichTextBlock, BulletedListItem } from "@/types/blog";
import "katex/dist/katex.min.css";
import { buildText } from "@/components/blocks/blockUtils";

const BulletedList = ({
  block,
  level,
}: {
  block: BaseBlock;
  level: number;
}) => {
  let children = null;
  if (block.children) {
    children = (
      <ul>
        {block.children.map((block: BaseBlock, i: number) => (
          <BulletedList block={block} level={level + 1} key={`${level}-${i}`} />
        ))}
      </ul>
    );
  }
  if (block.type !== "bulleted_list_item") {
    return null;
  }
  let bulleted_list_item = block as BulletedListItem;
  let text_blocks = bulleted_list_item.bulleted_list_item.text.map(
    (text_block: RichTextBlock, i: number) => {
      return buildText(text_block, i);
    }
  );

  return (
    <>
      <li>{text_blocks}</li>
      {children}
    </>
  );
};

export default BulletedList;

import React from "react";
import { BaseBlock, RichTextBlock } from "@/types/blog";
import "katex/dist/katex.min.css";
import { buildText } from "@/components/blocks/blockUtils";

const NumberedList = ({
  block,
  level,
}: {
  block: BaseBlock;
  level: number;
}) => {
  let children = null;
  if (block.children) {
    children = (
      <ol>
        {block.children.map((block: BaseBlock, i: number) => (
          <NumberedList block={block} level={level + 1} key={`${level}-${i}`} />
        ))}
      </ol>
    );
  }
  let text_blocks = block[block.type].text.map(
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

export default NumberedList;

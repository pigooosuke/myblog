import React from "react";
import { BaseBlock, RichTextBlock } from "@/types/blog";
import { buildText } from "@/components/blocks/blockUtils";

const Quote = ({ block }: { block: BaseBlock }) => {
  if (!block) {
    return null;
  }
  let text_blocks = block[block.type].text.map(
    (text_block: RichTextBlock, i: number) => {
      return buildText(text_block, i);
    }
  );
  return (
    <blockquote>
      {text_blocks.map((rich_text: string, i: number) => (
        <p key={`quote-${i}`}>{rich_text}</p>
      ))}
    </blockquote>
  );
};

export default Quote;

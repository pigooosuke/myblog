import React from "react";
import { ParagraphBlock, RichTextBlock } from "@/types/blog";
import { buildText } from "@/components/blocks/blockUtils";

const Paragraph = ({ paragraph }: { paragraph: ParagraphBlock }) => {
  if (!paragraph) {
    return null;
  }
  let text_blocks = paragraph.paragraph!.text.map(
    (text_block: RichTextBlock, i: number) => {
      return buildText(text_block, i);
    }
  );
  return <p>{text_blocks}</p>;
};

export default Paragraph;

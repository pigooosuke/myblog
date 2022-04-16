import React from "react";
import { RichTextBlock, HeadingBlock } from "@/types/blog";
import { buildText } from "@/components/blocks/blockUtils";

const Heading = ({
  heading,
  level,
}: {
  heading: HeadingBlock;
  level: number;
}) => {
  if (!heading) {
    return null;
  }
  const richTextBlocks = heading[heading.type]!.text as RichTextBlock[];
  let text_blocks = richTextBlocks.map(
    (text_block: RichTextBlock, i: number) => {
      return buildText(text_block, i);
    }
  );
  const tag = `h${level + 2}`;
  const elements = React.createElement(tag, {}, text_blocks);

  return <>{elements}</>;
};

export default Heading;

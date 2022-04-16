import React from "react";
import {
  BaseBlock,
  HeadingBlock,
  ParagraphBlock,
  ImageBlock,
  QuoteBlock,
  EquationBlock,
  CodeBlock,
  BulletedListItem,
  NumberedListItem,
} from "@/types/blog";
import Paragraph from "@/components/blocks/paragraphBlock";
import Heading from "@/components/blocks/headingBlock";
import ImageBlk from "@/components/blocks/imageBlock";
import Code from "@/components/blocks/codeBlock";
import Quote from "@/components/blocks/quoteBlock";
import Equation from "@/components/blocks/equationBlock";
import BulletedList from "@/components/blocks/bulletedListBlock";
import NumberedList from "@/components/blocks/numberedListBlock";

export const NotionBlock = ({ block }: { block: BaseBlock }) => {
  if (block.type === "paragraph") {
    let paragraph = block as ParagraphBlock;
    return <Paragraph paragraph={paragraph} key={`p-${block.id}`} />;
  } else if (block.type === "heading_1") {
    let heading = block as HeadingBlock;
    return <Heading heading={heading} level={1} />;
  } else if (block.type === "heading_2") {
    let heading = block as HeadingBlock;
    return <Heading heading={heading} level={2} />;
  } else if (block.type === "heading_3") {
    let heading = block as HeadingBlock;
    return <Heading heading={heading} level={3} />;
  } else if (block.type === "image") {
    let image = block as ImageBlock;
    return <ImageBlk image={image} />;
  } else if (block.type === "code") {
    let code = block as CodeBlock;
    return <Code code={code} />;
  } else if (block.type === "equation") {
    let equation = block as EquationBlock;
    return <Equation equation={equation} />;
  } else if (block.type === "quote") {
    let quote = block as QuoteBlock;
    return <Quote quote={quote} />;
  } else if (block.type === "divider") {
    return <hr />;
  } else if (block.type === "bulleted_list_item") {
    let bulletedlistitem = block as BulletedListItem;
    return (
      <ul>
        {bulletedlistitem.list_items?.map((subblock: BaseBlock, i: number) => (
          <BulletedList
            block={subblock}
            level={0}
            key={`ul-${subblock.id}-${i}`}
          />
        ))}
      </ul>
    );
  } else if (block.type === "numbered_list_item") {
    let numberedlistitem = block as NumberedListItem;
    return (
      <ol>
        {numberedlistitem.list_items?.map((subblock: BaseBlock, i: number) => (
          <NumberedList
            block={subblock}
            level={0}
            key={`ol-${subblock.id}-${i}`}
          />
        ))}
      </ol>
    );
  }

  return null;
};

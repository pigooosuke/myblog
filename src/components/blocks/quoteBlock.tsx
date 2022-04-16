import React from "react";
import { QuoteBlock, RichTextBlock } from "@/types/blog";
import { buildText } from "@/components/blocks/blockUtils";

const Quote = ({ quote }: { quote: QuoteBlock }) => {
  if (!quote) {
    return null;
  }
  let text_blocks = quote.quote.text.map(
    (text_block: RichTextBlock, i: number) => {
      return buildText(text_block, i);
    }
  );
  return (
    <blockquote>
      {/* {text_blocks.map((rich_text: string, i: number) => {
        return <p key={`quote-${i}`}>{rich_text}</p>;
      })} */}
      {text_blocks}
    </blockquote>
  );
};

export default Quote;

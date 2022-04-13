import React from "react";
import { RichTextBlock } from "@/types/blog";
import { RichText } from "@/types/block";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const _DecorateText = (rich_text: RichText) => {
  let element:
    | React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    | string = rich_text.content;

  if (rich_text.type === "equation") {
    let token = "\\(" + rich_text.content + "\\)";
    element = <Latex key={`latex-${rich_text.index}`}>{token}</Latex>;
    return element;
  }
  if (rich_text.annotations.bold) {
    element = <b key={`b-${rich_text.index}`}>{element}</b>;
  }
  if (rich_text.annotations.italic) {
    element = <i key={`i-${rich_text.index}`}>{element}</i>;
  }
  if (rich_text.annotations.strikethrough) {
    element = <s key={`s-${rich_text.index}`}>{element}</s>;
  }
  if (rich_text.annotations.underline) {
    element = <u key={`u-${rich_text.index}`}>{element}</u>;
  }
  if (rich_text.annotations.code) {
    element = <code key={`code-${rich_text.index}`}>{element}</code>;
  }
  if (rich_text.href) {
    element = (
      <a href={rich_text.href} key={`a-${rich_text.index}`}>
        {element}
      </a>
    );
  }

  return element;
};

export const buildText = (text_block: RichTextBlock, index: number) => {
  let rich_text: RichText = {
    type: text_block.type,
    content: text_block[text_block.type].content,
    annotations: text_block.annotations,
    href: text_block.href,
    index: index,
  };
  switch (text_block.type) {
    case "text":
      rich_text.content = text_block.text.content;
      break;
    case "equation":
      rich_text.content = text_block.equation.expression;
      break;
    default:
      rich_text.content = "unknown text block";
  }
  return _DecorateText(rich_text);
};

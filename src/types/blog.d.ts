import internal from "stream";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

// utils
type PickType<T, K extends keyof T> = T[K];

// notion.blocks.children.list
declare type ListBlockChildrenResponseResults = PickType<
  ListBlockChildrenResponse,
  "results"
>;
declare type BaseBlock = typeof ListBlockChildrenResponseResults[number];

export interface Post {
  page_id: string;
  slug: string;
  title: string;
  tags: string[];
  paper_url?: string;
  description: string;
  created: string;
}

export interface PostMetaTags {
  id: number;
  name: string;
  color: string;
}

export interface RichText {
  type: string;
  content: string;
  annotations: Annotation;
  href: string | null;
  index: number;
}

interface Annotation {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

type RichTextBlockText = {
  type: "text";
  text: {
    content: string;
    link: {
      url: TextRequest;
    } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
};
type RichTextBlockEquation = {
  type: "equation";
  equation: {
    expression: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
};
export type RichTextBlock = RichTextBlockText | RichTextBlockEquation;

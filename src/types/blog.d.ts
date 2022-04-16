import internal from "stream";

export interface BaseBlock {
  type:
    | "paragraph"
    | "heading_1"
    | "heading_2"
    | "heading_3"
    | "bulleted_list_item"
    | "numbered_list_item"
    | "quote"
    | "equation"
    | "code"
    | "divider"
    | "image";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  list_items?: BaseBlock[];

  paragraph?: {
    text: RichTextBlock[];
  };
  heading_1?: {
    text: RichTextBlock[];
  };
  heading_2?: {
    text: RichTextBlock[];
  };
  heading_3?: {
    text: RichTextBlock[];
  };
  bulleted_list_item?: {
    text: RichTextBlock[];
  };
  numbered_list_item?: {
    text: RichTextBlock[];
  };
  quote?: {
    text: RichTextBlock[];
  };
  equation?: {
    expression: string;
  };
  code?: {
    text: RichTextBlock[];
    caption: RichTextBlock[];
    language: string;
  };
  divider?: Record<string, never>;
  image?: {
    type: "file";
    file: {
      url: string;
      expiry_time: string;
    };
    caption: RichTextBlock[];
  };
}

export interface HeadingBlock {
  type: "heading_1" | "heading_2" | "heading_3";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  heading_1?: {
    text: RichTextBlock[];
  };
  heading_2?: {
    text: RichTextBlock[];
  };
  heading_3?: {
    text: RichTextBlock[];
  };
}

export interface ParagraphBlock {
  type: "paragraph";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  paragraph: {
    text: RichTextBlock[];
  };
}

export interface QuoteBlock {
  type: "quote";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  quote: {
    text: RichTextBlock[];
  };
}

export interface BulletedListItem {
  type: "bulleted_list_item";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  list_items?: BaseBlock[];
  bulleted_list_item: {
    text: RichTextBlock[];
  };
}

export interface NumberedListItem {
  type: "numbered_list_item";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  list_items?: BaseBlock[];
  numbered_list_item: {
    text: RichTextBlock[];
  };
}

export interface EquationBlock {
  type: "equation";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  equation: {
    expression: string;
  };
}

export interface CodeBlock {
  type: "equation";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  code: {
    text: RichTextBlock[];
    caption: RichTextBlock[];
    language: string;
  };
}

export interface ImageBlock {
  type: "image";
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  children?: BaseBlock[];
  list_items?: BaseBlock[];
  image: {
    type: "file";
    file: {
      url: string;
      expiry_time: string;
    };
    caption: RichTextBlock[];
  };
}

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

export type RichTextBlockText = {
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
export type RichTextBlockEquation = {
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

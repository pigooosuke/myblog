import {
  Post,
  QueryDatabaseResponseRecord,
  BaseBlock,
  PostMetaTags,
} from "@/types/blog";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

type queryDatabaseParam = {
  database_id: string;
  sorts: unknown;
  page_size: number;
  filter?: unknown;
};

export async function queryDatabase(pageSize: number = 10, preview?: boolean) {
  // get Posts order by created desc
  let params: queryDatabaseParam = {
    database_id: process.env.DATABASE_ID,
    sorts: [
      {
        property: "created",
        direction: "descending",
      },
    ],
    page_size: pageSize,
  };
  if (!preview) {
    params.filter = {
      property: "publish",
      checkbox: {
        equals: true,
      },
    };
  }

  return await notion.databases.query(params);
}

export async function getPost(page_id: string) {
  // get single post
  return await notion.pages.retrieve({ page_id: page_id });
}

export async function getPostContent(id: string) {
  // get post blocks
  let results: BaseBlock[] = [];
  let params = {
    block_id: id,
    page_size: 100,
  };
  let postContent = await notion.blocks.children.list(params);
  // get children blocks: inefficient loop
  for (const block of postContent.results) {
    if (block.has_children === true) {
      let children = await getPostContent(block.id);
      results.push({ children: children, ...block });
    } else {
      results.push({ ...block });
    }
  }
  while (postContent.has_more) {
    postContent = await notion.blocks.children.list({
      ...params,
      start_cursor: postContent.next_cursor,
    });
    // get children blocks: inefficient loop
    for (const block of postContent.results) {
      if (block.has_children === true) {
        let children = await getPostContent(block.id);
        results.push({ children: children, ...block });
      } else {
        results.push({ ...block });
      }
    }
  }
  return results;
}

export const collectList = (blocks: BaseBlock[]) =>
  blocks.reduce((arr, block, i) => {
    const isBulletedListItem = block.type === "bulleted_list_item";
    const isNumberedListItem = block.type === "numbered_list_item";

    if (!isBulletedListItem && !isNumberedListItem) return arr.concat(block);

    if (i === 0) {
      const list = {
        type: block.type,
        list_items: [block],
      };
      return arr.concat(list);
    }

    const prevList = arr[arr.length - 1];

    if (
      (isBulletedListItem && prevList.type !== "bulleted_list_item") ||
      (isNumberedListItem && prevList.type !== "numbered_list_item")
    ) {
      const list = {
        type: block.type,
        list_items: [block],
      };
      return arr.concat(list);
    }

    prevList.list_items.push(block);

    return arr;
  }, []);

export async function getPosts(pageSize: number = 10, preview?: boolean) {
  // get all posts
  let results = [];
  let params: queryDatabaseParam = {
    database_id: process.env.DATABASE_ID,
    sorts: [
      {
        property: "created",
        direction: "descending",
      },
    ],
    page_size: pageSize,
  };
  if (!preview) {
    params.filter = {
      property: "publish",
      checkbox: {
        equals: true,
      },
    };
  }
  let postContents = await notion.databases.query(params);
  results = [...postContents.results];
  while (postContents.has_more) {
    postContents = await notion.blocks.children.list({
      ...params,
      start_cursor: postContents.next_cursor,
    });
    results = [...results, ...postContents.results];
  }
  return results;
}

export function buildPost(block: QueryDatabaseResponseRecord) {
  const prop = block.properties;

  const post: Post = {
    page_id: block.id,
    slug: prop.slug.rich_text[0]?.plain_text,
    title: prop["タイトル"].title[0].plain_text,
    tags: prop.tags.multi_select.map((obj: PostMetaTags) => obj.name),
    paper_url: prop.paper_url.rich_text[0]?.plain_text || null,
    description: prop.description.rich_text[0]?.plain_text || null,
    created: _to_date(prop.created.created_time),
  };

  return post;
}

function _to_date(datetime_string: string) {
  const utcDate: Date = parseISO(datetime_string);
  return format(utcDate, "yyyy-MM-dd", { timeZone: "Asia/Tokyo" });
}

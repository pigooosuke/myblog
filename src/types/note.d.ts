import internal from "stream";
import { QueryDatabaseResponse, BlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

// utils
type PickProps<T, K extends keyof T> = { [P in Extract<keyof T, K>]: T[P] };
type PickType<T, K extends keyof T> = T[K];


// notion.databases.query
type QueryDatabaseResponseResults = PickProps<QueryDatabaseResponse, 'results'>;
declare type QueryDatabaseResponseRecord = (typeof QueryDatabaseResponseResults)[number];


// notion.blocks.children.list
type ListBlockChildrenResponseResults = PickType<ListBlockChildrenResponse, 'results'>;
declare type BlockRecord = (typeof ListBlockChildrenResponseResults)[number];

type ParagraphBlock = PickType<BlockRecord, 'paragraph'>;
type ParagraphTextBlock = PickType<ParagraphBlock, 'text'>;
declare type RichTextBlock = (typeof ParagraphTextBlock)[number];


export interface Note {
    page_id: string,
    title: string,
    tags: string[],
    paper_url: string,
    description: string,
    created: string,
}

export interface NoteMetaTags {
    id: number,
    name: string,
    color: string,
}

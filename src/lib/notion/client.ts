import {
    Note,
    QueryDatabaseResponseRecord,
    BlockRecord,
    NoteMetaTags,
} from '@/types/note';
import { ListBlockChildrenParameters, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
const blogIndexCache = require('./blog-index-cache.js')
const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export async function queryDatabase(pageSize: number = 10) {
    if (blogIndexCache.exists()) {
        const allNotes = await getAllNotes()
        return allNotes.slice(0, pageSize).map(_buildNote)
    }
    let params = {
        database_id: process.env.DATABASE_ID || "0",
        sorts: [
            {
                property: 'created',
                direction: 'descending',
            },
        ],
        page_size: pageSize,
    };
    const resp = await notion.databases.query(params);
    return resp.results.map((note: QueryDatabaseResponseRecord) => _buildNote(note))
}


export async function getNote(note_id: string) {
    if (blogIndexCache.exists()) {
        const allNotes = await getAllNotes()
        let targetNote = allNotes.find(note => note.id === note_id)
        return _buildNote(targetNote)
    }
    const resp = await notion.pages.retrieve({ page_id: note_id });
    return _buildNote(resp)
}


export async function getBlocks(page_id: string) {
    let results: BlockRecord[] = []
    let params: ListBlockChildrenParameters = {
        block_id: page_id,
        page_size: 100,
    }
    while (true) {
        const resp = await notion.blocks.children.list(params);
        // too slow: improvement is required
        for (const block of resp.results) {
            if (block.has_children === true) {
                block.list_items = await getBlocks(block.id)
            }
            results.push(block)
        }

        if (!resp.has_more) {
            break
        }
        params['start_cursor'] = resp.next_cursor
    }
    return results
}



export const collectList = (blocks: BlockRecord[]) =>
    blocks.reduce((arr, block, i) => {
        const isBulletedListItem = block.type === 'bulleted_list_item'
        const isNumberedListItem = block.type === 'numbered_list_item'

        if (!isBulletedListItem && !isNumberedListItem) return arr.concat(block)

        if (i === 0) {
            const list = {
                type: block.type,
                list_items: [block],
            }
            return arr.concat(list)
        }

        const prevList = arr[arr.length - 1]

        if (
            (isBulletedListItem && prevList.type !== 'bulleted_list_item') ||
            (isNumberedListItem && prevList.type !== 'numbered_list_item')
        ) {
            const list = {
                type: block.type,
                list_items: [block],
            }
            return arr.concat(list)
        }

        prevList.list_items.push(block)

        return arr
    }, []
    )



export async function getAllNotes() {
    let results: QueryDatabaseResponseRecord[] = []
    if (blogIndexCache.exists()) {
        results = blogIndexCache.get()
        console.log('Found cached posts.')
    } else {
        let params: QueryDatabaseParameters = {
            database_id: process.env.DATABASE_ID || "0",
            sorts: [
                {
                    property: 'created',
                    direction: 'descending',
                },
            ],
            page_size: 100,
        };

        while (true) {
            const resp = await notion.databases.query(params);
            results = results.concat(resp.results)

            if (!resp.has_more) {
                break
            }

            params['start_cursor'] = resp.next_cursor
        }
    }

    return results.filter((note: QueryDatabaseResponseRecord) => _buildNote(note))
}

function _buildNote(note: QueryDatabaseResponseRecord) {
    const prop = note.properties

    const post: Note = {
        page_id: note.id,
        title: prop.タイトル.title[0].plain_text,
        tags: prop.tags.multi_select.map((obj: NoteMetaTags) => obj.name),
        paper_url: prop.paper_url.rich_text[0]?.plain_text || null,
        description: prop.description.rich_text[0]?.plain_text || null,
        created: _to_date(prop.created.created_time),
    }

    return post
}

function _to_date(datetime_string: string) {
    const utcDate: Date = parseISO(datetime_string)
    return format(utcDate, 'yyyy-MM-dd', { timeZone: 'Asia/Tokyo' })
}

require('dotenv').config()
const fs = require('fs')
const path = require('path')
const BLOG_INDEX_CACHE = path.resolve('.blog_index_data')

const { Client } = require('@notionhq/client')

const notionClient = new Client({
    auth: process.env.NOTION_TOKEN,
})

exports.exists = function () {
    return fs.existsSync(BLOG_INDEX_CACHE)
}

exports.get = function () {
    return JSON.parse(fs.readFileSync(BLOG_INDEX_CACHE))
}

exports.set = async function () {
    let params = {
        database_id: process.env.DATABASE_ID || "0",
        sorts: [
            {
                property: 'created',
                direction: 'descending',
            },
        ],
        page_size: 100,
    }

    let results = []

    while (true) {
        const data = await notionClient.databases.query(params)

        results = results.concat(data.results)

        if (!data.has_more) {
            break
        }

        params['start_cursor'] = data.next_cursor
    }

    fs.writeFileSync(BLOG_INDEX_CACHE, JSON.stringify(results))
    console.log(`Cached ${results.length} posts into ${BLOG_INDEX_CACHE}`)

    return
}

exports.expire = function () {
    return fs.unlinkSync(BLOG_INDEX_CACHE)
}
import React from 'react';
import { BaseBlock } from '@/types/blog';
import Paragraph from '@/components/blocks/paragraph'
import Heading from '@/components/blocks/heading'
import ImageBlock from '@/components/blocks/image'
import Code from '@/components/blocks/code'
import Quote from '@/components/blocks/quote'
import BulletedList from '@/components/blocks/bulletedList'
import NumberedList from '@/components/blocks/numberedList'


export const NotionBlock = ({ block }: { block: BaseBlock }) => {
    if (block.type === 'paragraph') {
        return <Paragraph block={block} key={`p-${block.id}`} />
    } else if (block.type === 'heading_1') {
        return <Heading block={block} level={1} />
    } else if (block.type === 'heading_2') {
        return <Heading block={block} level={2} />
    } else if (block.type === 'heading_3') {
        return <Heading block={block} level={3} />
    } else if (block.type === 'image') {
        return <ImageBlock block={block} />
    } else if (block.type === 'code') {
        return <Code block={block} />
    } else if (block.type === 'quote') {
        return <Quote block={block} />
    } else if (block.type === 'divider') {
        return <hr />
    } else if (block.type === 'bulleted_list_item') {
        return (<ul>{block.list_items.map((subblock: BaseBlock, i: number) => <BulletedList block={subblock} level={0} key={`ul-${subblock.id}-${i}`} />)}</ul>)
    } else if (block.type === 'numbered_list_item') {
        return (<ol>{block.list_items.map((subblock: BaseBlock, i: number) => <NumberedList block={subblock} level={0} key={`ol-${subblock.id}-${i}`} />)}</ol>)
    }
    // TODO block
    // 
    // callout
    // embed
    // bookmark
    // link_preview
    // table

    return null
}

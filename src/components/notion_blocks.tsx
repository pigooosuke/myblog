import React from 'react';
import { BaseBlock } from '@/types/blog';
import Paragraph from '@/components/blocks/paragraph'
import Heading from '@/components/blocks/heading'
import ImageBlock from '@/components/blocks/image'
import Code from '@/components/blocks/code'
import Quote from '@/components/blocks/quote'
import BulletedList from '@/components/blocks/bulleted_list'
import NumberedList from '@/components/blocks/numbered_list'


const NotionBlock = ({ block }: { block: BaseBlock }) => {
    if (block.type === 'paragraph') {
        return <Paragraph block={block} key={`paragraph-${block.id}-${block.index}`} />
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
        return <BulletedList block={block} />
    } else if (block.type === 'numbered_list_item') {
        return <NumberedList block={block} />
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

export default NotionBlock
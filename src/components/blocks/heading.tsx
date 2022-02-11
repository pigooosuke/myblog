import React from 'react';
import {
    BaseBlock,
    RichTextBlock,
} from '@/types/blog';
import { buildText } from "@/components/blocks/block_utils"


const Heading = ({ block, level }: { block: BaseBlock, level: number }) => {
    if (!block) {
        return null
    }
    let text_blocks = block[block.type].text.map((text_block: RichTextBlock, i: number) => {
        return buildText(text_block)
    })
    const tag = `h${level + 3}`
    const heading = React.createElement(tag, {}, text_blocks)

    return (<>{heading}</>)
}

export default Heading
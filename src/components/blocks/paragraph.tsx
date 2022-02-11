import React from 'react';
import {
    BaseBlock,
    RichTextBlock
} from '@/types/blog';
import { buildText } from "@/components/blocks/block_utils"


const Paragraph = ({ block }: { block: BaseBlock }) => {
    if (!block) {
        return null
    }
    let text_blocks = block[block.type].text.map((text_block: RichTextBlock, i: number) => {
        return buildText(text_block)
    })
    return (<p key={`p-${block.id}`}>{text_blocks}</p>)
}

export default Paragraph
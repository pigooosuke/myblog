import React from 'react';
import {
    BlockRecord,
    RichTextBlock
} from '@/types/note';
import { buildText } from "@/components/blocks/block_utils"


const Paragraph = ({ block }: { block: BlockRecord }) => {
    if (!block) {
        return null
    }
    let text_blocks = block[block.type].text.map((text_block: RichTextBlock, i: number) => {
        return buildText(text_block)
    })
    return (<p key={`p-${block.id}`}>{text_blocks}</p>)
}

export default Paragraph
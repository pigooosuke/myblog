import React from 'react';
import {
    BlockRecord,
    RichTextBlock,
} from '@/types/note';
import { buildText } from "@/components/blocks/block_utils"


const Quote = ({ block }: { block: BlockRecord }) => {
    if (!block) {
        return null
    }
    let text_blocks = block[block.type].text.map((text_block: RichTextBlock, i: number) => {
        return buildText(text_block)
    })
    return (
        <blockquote>
            {text_blocks.map((rich_text: string, i: number) => (
                <p key={`quote-${i}`}>{rich_text}</p>
            ))}
        </blockquote>
    )
}

export default Quote
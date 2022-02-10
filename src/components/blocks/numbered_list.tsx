import React from 'react';
import {
    BlockRecord,
    RichTextBlock
} from '@/types/note';
import 'katex/dist/katex.min.css'
import { buildText } from "@/components/blocks/block_utils"


const NumberedList = ({ block }: { block: BlockRecord }) => {
    return (
        <ul>
            {block.list_items.map((list_item: BlockRecord, i: number) => {
                let text_blocks = list_item[list_item.type].text.map((text_block: RichTextBlock, i: number) => {
                    return buildText(text_block)
                })
                return (
                    <>
                        <li key={`numbered-list-item-${i}`}>
                            {text_blocks}
                        </li>
                        {list_item.has_children === true ? <NumberedList block={list_item} /> : ('')}
                    </>
                )
            })}
        </ul>
    )
}

export default NumberedList
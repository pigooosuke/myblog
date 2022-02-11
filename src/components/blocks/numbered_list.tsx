import React from 'react';
import {
    BaseBlock,
    RichTextBlock
} from '@/types/blog';
import 'katex/dist/katex.min.css'
import { buildText } from "@/components/blocks/block_utils"


const NumberedList = ({ block }: { block: BaseBlock }) => {
    return (
        <ul key={`numbered-list-item-ul-${block.id}`}>
            {block.list_items.map((list_item: BaseBlock, i: number) => {
                let text_blocks = list_item[list_item.type].text.map((text_block: RichTextBlock, i: number) => {
                    return buildText(text_block)
                })
                return (
                    <>
                        <li key={`numbered-list-item-${block.id}-${i}`}>
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
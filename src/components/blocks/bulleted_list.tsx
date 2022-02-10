import React from 'react';
import {
    BlockRecord,
    RichTextBlock,
} from '@/types/note';
import 'katex/dist/katex.min.css'
import { buildText } from "@/components/blocks/block_utils"


const BulletedList = ({ block }: { block: BlockRecord }) => {
    return (
        <ul key={`bulleted-list-item-ul-${block.id}`}>
            {block.list_items.map((list_item: BlockRecord, i: number) => {
                let text_blocks = list_item[list_item.type].text.map((text_block: RichTextBlock, i: number) => {
                    return buildText(text_block)
                })
                return (
                    <>
                        <li key={`bulleted-list-item-li-${i}`}>
                            {text_blocks}
                        </li>
                        {list_item.has_children === true ? <BulletedList block={list_item} /> : ('')}
                    </>
                )
            })}
        </ul>
    )
}

export default BulletedList
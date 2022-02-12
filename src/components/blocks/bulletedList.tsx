import React from 'react';
import {
    BaseBlock,
    RichTextBlock,
} from '@/types/blog';
import 'katex/dist/katex.min.css'
import { buildText } from "@/components/blocks/block_utils"


const BulletedList = ({ block, level }: { block: BaseBlock, level: number }) => {
    let children = null;
    if (block.children) {
        children = (
            <ul>
                {block.children.map((block: BaseBlock, i: number) => <BulletedList block={block} level={level + 1} key={`${level}-${i}`} />)}
            </ul>
        )
    }
    let text_blocks = block[block.type].text.map((text_block: RichTextBlock, i: number) => {
        return buildText(text_block, i)
    })

    return (
        <>
            <li>
                {text_blocks}
            </li>
            {children}
        </>
    )
}

export default BulletedList
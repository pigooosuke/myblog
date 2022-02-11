import React from 'react';
import {
    RichTextBlock
} from '@/types/blog';
import { RichText } from "@/types/block"
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

const _DecorateText = (rich_text: RichText) => {
    let element: (React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> | string) = rich_text.content

    if (rich_text.type === "equation") {
        let token = "\\(" + rich_text.content + "\\)"
        element = <Latex>{token}</Latex>
        return element
    }
    if (rich_text.annotations.bold) {
        element = <b>{element}</b>
    }
    if (rich_text.annotations.italic) {
        element = <i>{element}</i>
    }
    if (rich_text.annotations.strikethrough) {
        element = <s>{element}</s>
    }
    if (rich_text.annotations.underline) {
        element = <u>{element}</u>
    }
    if (rich_text.annotations.code) {
        element = <code>{element}</code>
    }
    if (rich_text.href) {
        element = <a href={rich_text.href}>{element}</a>
    }

    return element
}

export const buildText = (text_block: RichTextBlock) => {
    let rich_text: RichText = {
        type: text_block.type,
        content: text_block[text_block.type].content,
        annotations: text_block.annotations,
        href: text_block.href,
    }
    switch (text_block.type) {
        case 'text':
            rich_text.content = text_block.text.content
            break
        case 'equation':
            rich_text.content = text_block.equation.expression
            break
        default:
            rich_text.content = "unknown text block"
    }
    return _DecorateText(rich_text)
}
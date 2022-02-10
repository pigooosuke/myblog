export interface RichText {
    type: string
    content: string
    annotations: Annotation
    href: string
}

export interface Annotation {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
}
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import {
    BaseBlock,
} from '@/types/blog';
import "prismjs/themes/prism-tomorrow.css";
import 'prismjs/components/prism-jsx.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const Code = ({ block }: { block: BaseBlock }) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [])
    const code = block[block.type].text[0].text.content
    const language = block[block.type].language || 'javascript'

    return (
        <div>
            <pre className="line-numbers">
                <code className='language-jsx'
                    dangerouslySetInnerHTML={{
                        __html: Prism.highlight(
                            code!,
                            Prism.languages[language.toLowerCase()] ||
                            Prism.languages.javascript,
                            language
                        ),
                    }}
                />
            </pre>
        </div>
    )
}
export default Code
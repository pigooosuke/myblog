import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import styles from '@/styles/blocks.module.css'
import {
    BlockRecord,
} from '@/types/note';



const Code = ({ block }: { block: BlockRecord }) => {
    const code = block[block.type].text[0].text.content
    const language = block[block.type].language || 'javascript'

    return (
        <div className={styles.code}>
            <pre>
                <code
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
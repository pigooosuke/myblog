import Link from 'next/link';
import styles from '@/styles/noteItem.module.css'
import { Note } from '@/types/note';


export const NoteList = ({ notes }: { notes: Note[] }) => {
    const NoteListElements = notes.map((note: Note) => {
        return (
            <div className={styles.noteItem} key={note.page_id}>
                <div className={styles.noteItemMain}>
                    <div className={styles.noteItemContents}>
                        <div className={styles.noteItemDate}>
                            <span>{note.created}</span>
                        </div>
                        <Link href={`/note/${encodeURIComponent(note.page_id)}`} passHref>
                            <div className={styles.noteItemTitle}>
                                <span><a>{note.title}</a></span>
                            </div>
                        </Link>
                        <div className={styles.noteItemDescription}>
                            <span>{note.description}</span>
                        </div>
                        <div className={styles.noteItemTags}>
                            <ul>
                                {
                                    note.tags.map(item => { return (<li key={item}>#{item}</li>) })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (<>{NoteListElements}</>);
}

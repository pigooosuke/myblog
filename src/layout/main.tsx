import { ReactElement } from 'react'
import styles from '@/styles/index.module.css'
import Header from '@/components/layouts/header'

type LayoutProps = Required<{
    readonly children: ReactElement
}>

export const LayoutMain = ({ children }: LayoutProps) => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.contents}>
                    {children}
                </div>
            </div>
        </>)
}
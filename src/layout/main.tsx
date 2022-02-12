import type { AppProps } from 'next/app'
import styles from '@/styles/index.module.css'
import Header from '@/components/layouts/header'


function LayoutMain({ Component, pageProps }: AppProps) {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.contents}>
                    <Component {...pageProps} />
                </div>
            </div>
        </>)
}
export default LayoutMain
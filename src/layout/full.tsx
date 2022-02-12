import type { AppProps } from 'next/app'
import styles from '@/styles/index.module.css'
import Header from '@/components/layouts/header'


function LayoutFull({ Component, pageProps }: AppProps) {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <Component {...pageProps} />
            </div>
        </>)
}
export default LayoutFull
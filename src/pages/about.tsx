import type { ReactElement } from 'react'
import Image from 'next/image'
import styles from '@/styles/about.module.css'
import Link from 'next/link'
import Header from '@/components/layouts/header'

const About = () => {
    return (
        <>
            <div className={styles.profile}>
                <div className={styles.img}>
                    <Image
                        src="/imgs/profile.jpg"
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles.name}>
                    Yusuke Saito (pigooosuke)
                </div>
                <div className={styles.social}>
                    <Link href="https://twitter.com/pigooosuke">
                        <a>
                            <Image
                                src="/imgs/twitter-64x64.png"
                                width={32}
                                height={32}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default About


About.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            {page}
        </>
    )
}
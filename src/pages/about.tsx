import type { ReactElement } from "react";
import Image from "next/image";
import styles from "@/styles/about.module.css";
import Link from "next/link";
import { LayoutFull } from "@/layout/full";
import CommonMeta from "@/components/meta/CommonMeta";

const About = () => {
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.img}>
          <Image
            src="/imgs/profile.jpg"
            width={200}
            height={200}
            alt="profile"
          />
        </div>
        <div className={styles.name}>Yusuke Saito / pigooosuke</div>
        <div className={styles.social}>
          <Link href="https://twitter.com/pigooosuke">
            <a>
              <Image
                src="/imgs/twitter-64x64.png"
                width={32}
                height={32}
                alt="twitter"
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

About.getLayout = (page: ReactElement) => (
  <>
    <CommonMeta title="About" />
    <LayoutFull>{page}</LayoutFull>
  </>
);

export default About;

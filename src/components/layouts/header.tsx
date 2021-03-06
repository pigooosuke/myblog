import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/header.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

const Header = () => {
  const [sideMenuOpen, setsideMenuOpen] = useState<boolean>(false);
  const openSideMenu = () => {
    setsideMenuOpen(!sideMenuOpen);
  };

  const router = useRouter();
  useEffect(() => {
    setsideMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <a>Pigooosuke</a>
          </Link>
        </div>
        <div className={styles.menuButtonOpen} onClick={openSideMenu}>
          <button aria-label="toggle">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                fill="currentColor"
              />
              <path
                d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
                fill="currentColor"
              />
              <path
                d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className={styles.menuList}>
          <div className={styles.menuRss}>
            <Link href="/rss/feed.xml" passHref>
              <a>
                <Image
                  src="/imgs/rss-64x64.png"
                  width={16}
                  height={16}
                  alt="rss"
                />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/" passHref>
              <a>Blog</a>
            </Link>
          </div>
          <div>
            <Link href="/about" passHref>
              <a>About</a>
            </Link>
          </div>
        </div>
      </div>
      <div className={sideMenuOpen ? styles.sideMenu : styles.sideMenuClosed}>
        <div className={styles.sideMenuList}>
          <ul>
            <li>
              <Link href="/">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.menuButtonClose} onClick={openSideMenu}>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;

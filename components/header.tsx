import styles from '../styles/header.module.css'

const Header = () => {
    return (
        <nav className={styles.headerNav}>
            <div className={styles.logo}>
                <span>Pigooosuke</span>
            </div>
            <div className={styles.menuButton}>
                <button>
                    <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={styles.menuList}>
                <div>
                    <a href="#responsive-header">
                        Blog
                    </a>
                    <a href="#responsive-header">
                        About
                    </a>
                </div>
            </div>
        </nav >)
}
export default Header
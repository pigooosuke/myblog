import styles from '../styles/blogItem.module.css'

const BlogItem = () => {
    const path = "https://www.themoviedb.org/t/p/w1280_and_h720_multi_faces/rYFAvSPlQUCebayLcxyK79yvtvV.jpg";
    return (
        <div className={styles.blogItem}>
            <div className={styles.blogItemImage} style={{ backgroundImage: `url(${path})` }}></div>
            <div className={styles.blogItemMain}>
                <div className={styles.blogItemContents}>
                    <div className={styles.blogItemTitle}>Can coffee make you a better developer?</div>
                    <p className={styles.blogItemOutline}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                </div>
            </div>
        </div>
    )
}

export default BlogItem

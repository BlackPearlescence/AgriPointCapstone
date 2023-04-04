import styles from "./HomeHero.module.scss";

const HomeHero = () => {

    return(
        <div className={styles.homeHeroContainer}>
            <div className={styles.homeHeroMask}></div>
            <div className={styles.homeHeroHeadingContainer}>
                <h2>Hi there! We have fresh new produce to show you.</h2>
                <h4>All new tomatoes, carrots, and fresh apples straight from the orchard.</h4>
            </div>
        </div>
    )
}

export default HomeHero;
import styles from "./HomeHero.module.scss";

const HomeHero = () => {

    return(
        <div className={styles.homeHeroContainer}>
            <div className={styles.homeHeroMask}></div>
            <div className={styles.homeHeroHeadingContainer}>
                <h2>Hi there! We have some <a href="#">new produce</a> to show you.</h2>
                <h4>All new <a href="#">tomatoes</a>, <a href="#">carrots</a>, and <a href="#">fresh apples</a> straight from the orchard.</h4>
                <a href="https://www.freepik.com/free-photo/fruits-vegetables_889490.htm#query=fruits%20and%20vegetables&position=6&from_view=search&track=ais">Image by onlyyouqj</a> on Freepik

            </div>
        </div>
    )
}

export default HomeHero;
import styles from "./LandingHero.module.scss"

const LandingHero = () => {

    return(
        <div className={styles.landingHeroContainer}>
            <div className={styles.landingHeroMask}></div>
            <div className={styles.landingBarContainer}>
                <div className={styles.brandContainer}>
                    <img className={styles.brandLogo} src={require("../images/IconOnly_Transparent_NoBuffer.png")} />
                    <img className={styles.brandTextLogo} src={require("../images/FullLogo_Transparent_NoBuffer (2).png")} />
                </div>
                <button className={styles.loginBtn}>Log In</button>
            </div>
            <div className={styles.ctaContainer}>
                <div className={styles.heroHeading}>
                    One big happy family of cultivators ready to 
                    deliver farm freshness to your doorstep.
                </div>
                <div className={styles.ctaBtnContainer}>
                    <button>Explore Products</button>
                    <button>Learn More</button>
                </div>
                <a href="#">I'm a farmer!</a>
            </div>
        </div>
    )
}

export default LandingHero;
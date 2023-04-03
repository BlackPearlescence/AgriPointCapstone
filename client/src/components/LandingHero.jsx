import { useState } from "react";
import styles from "./LandingHero.module.scss"
import classNames from "classnames";

const LandingHero = () => {
    const [heroItemsLoaded, setHeroItemsLoaded] = useState(false)

    const handleHeroItemsLoad = () => {
        setHeroItemsLoaded(true)
    }
    return(
        <div className={styles.landingHeroContainer} onLoad={handleHeroItemsLoad}>
            <div className={styles.landingHeroMask}></div>
            <div className={styles.landingBarContainer}>
                <div className={styles.brandContainer}>
                    <img className={styles.brandLogo} src={require("../images/IconOnly_Transparent_NoBuffer.png")} />
                    <img className={styles.brandTextLogo} src={require("../images/FullLogo_Transparent_NoBuffer (2).png")} />
                </div>
                <button className={styles.loginBtn}>Log In</button>
            </div>
            <div className={styles.ctaContainer}>
                <div className={heroItemsLoaded ?  styles.heroHeadingShow : styles.heroHeading}>
                    One big happy family of cultivators ready to 
                    deliver farm freshness to your doorstep.
                </div>
                <div className={heroItemsLoaded ? styles.ctaBtnContainerShow : styles.ctaBtnContainer}>
                    <button>Explore Products</button>
                    <button>Learn More</button>
                </div>
                <a href="#" className={heroItemsLoaded ? styles.farmerLinkShow : styles.farmerLink}>I'm a farmer!</a>
            </div>
        </div>
    )
}

export default LandingHero;
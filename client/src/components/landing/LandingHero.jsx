import { useState } from "react";
import styles from "./LandingHero.module.scss"
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
    const [heroItemsLoaded, setHeroItemsLoaded] = useState(false)
    const navigate = useNavigate()

    const handleHeroItemsLoad = () => {
        setHeroItemsLoaded(true)
    }
    return(
        <div className={styles.landingHeroContainer} onLoad={handleHeroItemsLoad}>
            <div className={styles.landingHeroMask}></div>
            <div className={styles.landingBarContainer}>
                <div className={styles.brandContainer} onClick={() => navigate("/")}>
                    <img className={styles.brandLogo} src={require("../../images/IconOnly_Transparent_NoBuffer.png")} />
                    <img className={styles.brandTextLogo} src={require("../../images/FullLogo_Transparent_NoBuffer (2).png")} />
                </div>
                <button className={styles.loginBtn}>Log In</button>
            </div>
            <div className={styles.ctaContainer}>
                <div className={heroItemsLoaded ?  styles.heroHeadingShow : styles.heroHeading}>
                    One big happy family of cultivators ready to 
                    deliver farm freshness to your doorstep.
                </div>
                <div className={heroItemsLoaded ? styles.ctaBtnContainerShow : styles.ctaBtnContainer}>
                    <button onClick={() => navigate("/products")}>Explore Products</button>
                    <button>Learn More</button>
                </div>
                <a href="#" className={heroItemsLoaded ? styles.farmerLinkShow : styles.farmerLink}>I'm a farmer!</a>
            </div>
            <div>
                <a className={styles.heroImageAttribution} href="https://www.freepik.com/free-vector/fruit-vegetables-background_7351193.htm#query=fruits%20and%20vegetables%20background&position=18&from_view=search&track=ais">Freepik</a>
            </div>
        </div>
    )
}

export default LandingHero;
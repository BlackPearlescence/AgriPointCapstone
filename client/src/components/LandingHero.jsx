import LandingBar from "./LandingBar";
import styles from "./LandingHero.module.scss"
import LandingHeroCTA from "./LandingHeroCTA";

const LandingHero = () => {

    return(
        <div className={styles.landingHeroContainer}>
            <img src={require("../images/landingHeroImg.jpg")} />
            <div className={styles.landingHeroMask}></div>
            <LandingBar />
            <LandingHeroCTA />
        </div>
    )
}

export default LandingHero;
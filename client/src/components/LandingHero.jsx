import styles from "./LandingHero.module.scss"
import LandingHeroMask from "./LandingHeroMask";

const LandingHero = () => {

    return(
        <div className={styles.landingHeroContainer}>
            <img src={require("../images/landingHeroImg.jpg")} />
        </div>
    )
}

export default LandingHero;
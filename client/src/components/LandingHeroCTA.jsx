import LandingBar from "./LandingBar";
import styles from "./LandingHeroCTA.module.scss"

const LandingHeroCTA = () => {

    return (
        <div className={styles.ctaContainer}>
            <div className={styles.heroHeading}>
                One big happy family of cultivators ready to 
                deliver farm freshness to your doorstep.
            </div>
            <div className={styles.ctaBtnContainer}>
                <button>Explore Products</button>
                <button>Learn More</button>
            </div>
            <a href="#">I'm a farmer</a>
        </div>
    )
}
export default LandingHeroCTA;
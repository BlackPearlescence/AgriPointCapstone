import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import TestimonialList from "../components/TestimonialList";
import styles from "./LandingPage.module.scss"

const LandingPage = () => {

    return(
        <div className={styles.landingPageContainer}>
            <LandingHero />
            <h3 className={styles.testHeading}>Farm goods that are NOT factory mass-produced but with the blood, sweat, and tears of our agricultural heroes.</h3>
            <TestimonialList />
            <h3 className={styles.testHeading}>And to the farmer, please join our loving family. We are on your side for eternity.</h3>
            <TestimonialList />
        </div>
    )
}

export default LandingPage;
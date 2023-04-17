import { useSelector } from "react-redux";
import LandingHero from "../components/landing/LandingHero";
import TestimonialList from "../components/landing/TestimonialList";
import styles from "./LandingPage.module.scss"
import { selectLoggedIn } from "../reducers/loginSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const loggedInState = useSelector(selectLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedInState){
            navigate("/home")
            // window.location.href = "/home"
        }
    })

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
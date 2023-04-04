import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import TestimonialList from "../components/TestimonialList";
import styles from "./LandingPage.module.scss"
import axios from "axios";

const LandingPage = () => {
    const [customerTestimonials, setCustomerTestimonials] = useState([])
    const [farmerTestimonials, setFarmerTestimonials] = useState([])

    useEffect(() => {
        const loadingTestimonials = async () => {
            try {
                const res = await axios.get("/testimonials")
                const json = await res.data
                setCustomerTestimonials(json)
                console.log(json)
            } catch (err) {
                console.error(err)
            }
        }
        loadingTestimonials()
    },[])

    return(
        <div className={styles.landingPageContainer}>
            <LandingHero />
            <h3 className={styles.testHeading}>Farm goods that are NOT factory mass-produced but with the blood, sweat, and tears of our agricultural heroes.</h3>
            <TestimonialList testimonials={customerTestimonials} />
            <h3 className={styles.testHeading}>And to the farmer, please join our loving family. We are on your side for eternity.</h3>
            <TestimonialList />
            <Footer />
        </div>
    )
}

export default LandingPage;
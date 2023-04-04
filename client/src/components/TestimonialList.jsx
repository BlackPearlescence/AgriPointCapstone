import { Grid } from "@mui/joy";
import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialList.module.scss"
import { useEffect, useState } from "react";
import axios from "axios"

const TestimonialList = () => {
    const [testimonals, setTestimonials] = useState([])

    useEffect(() => {
        const loadingTestimonials = async () => {
            try {
                const res = await axios.get("/testimonials")
                const json = await res.data
                setTestimonials(json)
                console.log(json)
            } catch (err) {
                console.error(err)
            }
        }
        loadingTestimonials()
    },[])
    
    return(
        <div className={styles.testimonialContainer}>
            <Grid container columnSpacing={10}>
                <Grid item>
                    <TestimonialCard />
                </Grid>
                <Grid item>
                    <TestimonialCard />
                </Grid>
                <Grid item>
                    <TestimonialCard />
                </Grid>
                <Grid item>
                    <TestimonialCard />
                </Grid>
            </Grid>
        </div>
    )
}

export default TestimonialList;
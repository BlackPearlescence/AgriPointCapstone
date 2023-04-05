import { Grid } from "@mui/joy";
import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialList.module.scss"

const TestimonialList = () => {
    
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
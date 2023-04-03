import { Avatar, Card, Divider, Grid, Typography } from "@mui/joy";
import styles from "./TestimonialCard.module.scss";
import { baseDarkText } from "./MaterialStyles";
import { ImQuotesLeft } from "react-icons/im"
import "../App.scss"

const TestimonialCard = () => {

    return(
        <Card variant="outlined" sx={{ width: 280 }}>
            <Grid container spacing={1} sx={{ alignItems: "center", flexDirection: "column"}}>
                <Grid item xs={7.5}>
                    <Avatar sx={{...baseDarkText,"--Avatar-size" : "100px"}}>SB</Avatar>
                </Grid>
                <Grid item xs={9}>
                    <Typography sx={{...baseDarkText, fontWeight: "800",fontSize : "18px"}}>Sam B.</Typography>
                </Grid>
                <Grid item xs={9}>
                    <ImQuotesLeft color="2C6E49" size={32} />
                </Grid>
            </Grid>
            <Divider />
            <Typography sx={{...baseDarkText, 
                fontStyle: "italic", 
                fontFamily: "Poppins", 
                textAlign : "center",
                fontWeight: "600"}}className={styles.testimonialText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Duis euismod risus a est tincidunt, ut vestibulum enim vestibulum.
            </Typography>
        </Card>
    )
}

export default TestimonialCard;
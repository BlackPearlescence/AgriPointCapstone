import styles from "./ProductReviewCard.module.scss";
import  Rating from "@mui/material/Rating"



const ProductReviewCard = ({ review }) => {

    return (
        <div className={styles.productReviewCardContainer}>
            <div className={styles.reviewHeaderContainer}>
                <img src="http://via.placeholder.com/640x360" alt="a user picture"/>
                <div className={styles.reviewHeaderTextContainer}>
                    <span className={styles.customerNameText}>CUSTOMER NA2222222222222222222222ME</span>
                    <Rating sx={{ fontSize: 30}} name="read-only" defaultValue={5} max={5} readOnly/>
                </div>
            </div>
            <span className={styles.reviewTitle}>A fucking awful product I tell you! Never again will I purchase this bullshit</span>
            <p className={styles.reviewBodyText}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


            </p>

        </div>
    )
}

export default ProductReviewCard;
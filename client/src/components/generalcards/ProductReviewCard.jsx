import { useDispatch } from "react-redux";
import styles from "./ProductReviewCard.module.scss";
import  Rating from "@mui/material/Rating"
import { setExpandedReview, showReviewModal } from "../../reducers/productReviewSlice";



const ProductReviewCard = ({ review }) => {

    const dispatch = useDispatch()

    const handleReviewClick = () => {
        dispatch(setExpandedReview(review))
        dispatch(showReviewModal())
    }


    return (
        <div className={styles.productReviewCardContainer} onClick={handleReviewClick}>
            <div className={styles.reviewHeaderContainer}>
                <img src={review.customer.avatar_url} alt="a user picture"/>
                <div className={styles.reviewHeaderTextContainer}>
                    <span className={styles.customerNameText}>{review.customer.first_name}  {review.customer.last_name[0]}.</span>
                    <Rating sx={{ fontSize: 30}} name="read-only" defaultValue={review.rating} max={5} readOnly/>
                </div>
            </div>
            <span className={styles.reviewTitle}>{review.title}</span>
            <p className={styles.reviewBodyText}>
                {review.body}
            </p>

        </div>
    )
}

export default ProductReviewCard;
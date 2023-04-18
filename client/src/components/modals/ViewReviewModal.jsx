import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { hideReviewModal, selectExpandedReview, selectReviewModalShow, showReviewModal } from "../../reducers/productReviewSlice";
import { useEffect } from "react";
import styles from "./ViewReviewModal.module.scss";
import { Rating } from "@mui/material";


const ViewReviewModal = () => {

    const dispatch = useDispatch()
    const showReviewModalState = useSelector(selectReviewModalShow)
    const expandedReviewState = useSelector(selectExpandedReview)
    useEffect(()=> {
        console.log(expandedReviewState)
    }, [showReviewModalState])
    return(
        <Modal show={showReviewModalState} onHide={() => dispatch(hideReviewModal())} onShow={() => dispatch(showReviewModal)} centered>
            <div className={styles.reviewModalContainer}>
                <div className={styles.reviewHeaderContainer}>
                    <img src={expandedReviewState.customer && expandedReviewState.customer.avatar_url} alt="a user picture"/>
                    <div className={styles.reviewRatingContainer}>
                        <span className={styles.reviewerNameText}>{expandedReviewState.customer && expandedReviewState.customer.first_name}  {expandedReviewState.customer && expandedReviewState.customer.last_name[0]}.</span>
                        <Rating sx={{ fontSize: 30}} name="read-only" defaultValue={expandedReviewState.rating} max={5} readOnly/>
                    </div>
                </div>
                <span className={styles.reviewTitle}>{expandedReviewState.title}</span>
                <p className={styles.reviewBodyText}>{expandedReviewState.body}</p>
            </div>
        </Modal>
    )
}

export default ViewReviewModal;
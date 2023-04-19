import { Modal } from "react-bootstrap"
import styles from "./AddReviewModal.module.scss";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview, fetchProductReviews, hideCreateReviewModal, selectCreateReviewModalShow } from "../../reducers/productReviewSlice";
import { useState } from "react";
import { selectCustomerDetails } from "../../reducers/loginSlice";
import { selectProductInfo } from "../../reducers/productViewSlice";

const AddReviewModal = () => {

    const createReviewModalShowState = useSelector(selectCreateReviewModalShow)
    const customerDetailsState = useSelector(selectCustomerDetails)
    const productInfoState = useSelector(selectProductInfo)
    const dispatch = useDispatch()
    const [reviewForm, setReviewForm] = useState({
        title: "",
        body: "",
        rating: 0
    })

    const handleReviewFormChange = (e) => {
        setReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.name === "rating" ? parseInt(e.target.value) : e.target.value
        })
        console.log(reviewForm)
    }

    const handleReviewFormSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            title: reviewForm.title,
            body: reviewForm.body,
            rating: reviewForm.rating,
            customer: customerDetailsState._id,
            productId: productInfoState._id
        }
        dispatch(addProductReview(newReview))
        dispatch(hideCreateReviewModal())
        console.log(newReview)
    }

    return (
        <Modal show={createReviewModalShowState} onHide={() => dispatch(hideCreateReviewModal())} centered>
            <form className={styles.addReviewFormContainer} onSubmit={handleReviewFormSubmit}>
                <h3 className={styles.addReviewHeading}>Your Review</h3>    
                <Rating onChange={handleReviewFormChange} sx={{ fontSize: 50 }} name="rating"  />
                <input  onChange={handleReviewFormChange} className={styles.newReviewTitleInput} type="text" name="title" placeholder="Title"  required/>
                <textarea onChange={handleReviewFormChange} className={styles.newReviewBodyInput} name="body" placeholder="Review" required/>
                <button className={styles.newReviewSubmitBtn} type="submit">Submit Review!</button>
            </form>
        </Modal>
    )
}

export default AddReviewModal;
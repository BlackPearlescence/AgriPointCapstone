import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductReviewLayout.module.scss";
import { FaPlus } from "react-icons/fa"
import { selectLoggedIn } from "../../reducers/loginSlice";
import { showCreateReviewModal } from "../../reducers/productReviewSlice";


const ProductReviewLayout = ({ children }) => {

    const loggedInState = useSelector(selectLoggedIn)
    const dispatch = useDispatch()

    return (
        <div className={styles.productReviewParentContainer}>
            <h2>Customer Reviews</h2>
            <div className={styles.productReviewContainer}>
                {loggedInState ? (
                    <div onClick={() => dispatch(showCreateReviewModal())} className={styles.addReviewCard}>
                        <h3>Add your own!</h3>
                        <FaPlus size={260} color="2C6E49"/>
                    </div>
                ) : null}
                {children}
            </div>
        </div>
        
    )
}

export default ProductReviewLayout;
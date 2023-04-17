import { useSelector } from "react-redux";
import styles from "./ProductReviewLayout.module.scss";
import { FaPlus } from "react-icons/fa"
import { selectLoggedIn } from "../../reducers/loginSlice";


const ProductReviewLayout = ({ children }) => {

    const loggedInState = useSelector(selectLoggedIn)

    return (
        <div className={styles.productReviewParentContainer}>
            <h2>Customer Reviews</h2>
            <div className={styles.productReviewContainer}>
                {loggedInState ? (
                    <div className={styles.addReviewCard}>
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
import styles from "./ProductReviewLayout.module.scss";
import { FaPlus } from "react-icons/fa"


const ProductReviewLayout = ({ children }) => {

    return (
        <div className={styles.productReviewParentContainer}>
            <h2>Customer Reviews</h2>
            <div className={styles.productReviewContainer}>
                <div className={styles.addReviewCard}>
                    <h3>Add your own!</h3>
                    <FaPlus size={260} color="2C6E49"/>
                </div>
                {children}
            </div>
        </div>
        
    )
}

export default ProductReviewLayout;
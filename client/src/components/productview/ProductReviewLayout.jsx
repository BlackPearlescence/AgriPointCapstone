import styles from "./ProductReviewLayout.module.scss";


const ProductReviewLayout = ({ children }) => {

    return (
        <div className={styles.productReviewParentContainer}>
            <h2>Customer Reviews</h2>
            <div className={styles.productReviewContainer}>
                {children}
            </div>
        </div>
        
    )
}

export default ProductReviewLayout;
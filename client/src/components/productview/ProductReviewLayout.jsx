import styles from "./ProductReviewLayout.module.scss";


const ProductReviewLayout = ({ children }) => {

    return (
        <div className={styles.productReviewContainer}>
            {children}
        </div>
    )
}

export default ProductReviewLayout;
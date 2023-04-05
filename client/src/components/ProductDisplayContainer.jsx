import styles from "./ProductDisplayContainer.module.scss";

const ProductDisplayContainer = ({ children }) => {

    return(
        <div className={styles.productWrapper}>
            {children}
        </div>
    )
}

export default ProductDisplayContainer;
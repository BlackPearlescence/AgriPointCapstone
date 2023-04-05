import styles from "./ProductContainer.module.scss";

const ProductContainer = ({ children }) => {

    return (
        <div className={styles.productCardWrapper}>
            {children}
        </div>
    )
}

export default ProductContainer
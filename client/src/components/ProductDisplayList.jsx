import ProductDisplay from "./ProductDisplay";
import styles from "./ProductDisplayList.module.scss";

const ProductDisplayList = () => {

    return(
        <div className={styles.productDisplayListContainer}>
            <ProductDisplay />
            <ProductDisplay />
            <ProductDisplay />
        </div>
    )
}

export default ProductDisplayList;
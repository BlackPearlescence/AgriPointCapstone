import ProductViewLayout from "../components/productview/ProductViewLayout";
import styles from "./ProductViewPage.module.scss";


const ProductViewPage = () => {
    return(
        <div className={styles.productViewPageContainer}>
            <ProductViewLayout />
            <ProductViewLayout />
            <ProductViewLayout />
        </div>
    )
}

export default ProductViewPage;
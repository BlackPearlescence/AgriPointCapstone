import FilterSidebar from "../components/FilterSidebar";
import ProductContainer from "../components/ProductContainer";
import styles from "./ProductsPage.module.scss";

const ProductsPage = () => {

    return (
        <div className={styles.productsPageWrapper}>
            <FilterSidebar>

            </FilterSidebar>
            <ProductContainer>
                
            </ProductContainer>
        </div>
    )
}

export default ProductsPage;
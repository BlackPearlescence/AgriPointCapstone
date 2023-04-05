import { Radio } from "@mui/joy";
import FilterAccordion from "../components/FilterAccordion";
import FilterSidebar from "../components/FilterSidebar";
import ProductContainer from "../components/ProductContainer";
import styles from "./ProductsPage.module.scss";

const ProductsPage = () => {

    return (
        <div className={styles.productsPageWrapper}>
            <FilterSidebar>
                <FilterAccordion>
                    <Radio checked={false}
                    value="a"
                    name="type-filter"
                    label="a"/>
                    <Radio checked={false}
                    value="b"
                    name="type-filter"
                    label="b"/>
                    <Radio checked={false}
                    value="c"
                    name="type-filter"
                    label="c"/>
                    <Radio checked={false}
                    value="d"
                    name="type-filter"
                    label="d"/>
                </FilterAccordion>
                <FilterAccordion>
                    <Radio checked={false}
                    value="a"
                    name="type-filter"
                    label="a"/>
                    <Radio checked={false}
                    value="b"
                    name="type-filter"
                    label="b"/>
                    <Radio checked={false}
                    value="c"
                    name="type-filter"
                    label="c"/>
                    <Radio checked={false}
                    value="d"
                    name="type-filter"
                    label="d"/>
                </FilterAccordion>
                <FilterAccordion>
                    <Radio checked={false}
                    value="a"
                    name="type-filter"
                    label="a"/>
                    <Radio checked={false}
                    value="b"
                    name="type-filter"
                    label="b"/>
                    <Radio checked={false}
                    value="c"
                    name="type-filter"
                    label="c"/>
                    <Radio checked={false}
                    value="d"
                    name="type-filter"
                    label="d"/>
                </FilterAccordion>
            </FilterSidebar>
            <ProductContainer>
            </ProductContainer>
        </div>
    )
}

export default ProductsPage;
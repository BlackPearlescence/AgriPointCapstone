import { Radio, RadioGroup } from "@mui/joy";
import FilterAccordion from "../components/FilterAccordion";
import FilterSidebar from "../components/FilterSidebar";
import ProductContainer from "../components/ProductContainer";
import styles from "./ProductsPage.module.scss";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {

    return (
        <div className={styles.productsPageWrapper}>
            <FilterSidebar>
                <FilterAccordion heading={"Products"}>
                    <RadioGroup defaultValue="allproducts" >
                        <Radio size="lg" value="allproducts" label="All Products" variant="soft" color="success"/>
                        <Radio size="lg" value="fruit" label="Fruit" variant="soft" color="success"/>
                        <Radio size="lg" value="vegetables" label="Vegetables" variant="soft"  color="success"/>
                        <Radio size="lg" value="eggs" label="Eggs" variant="soft" color="success"/>
                        <Radio size="lg" value="milk" label="Milk" variant="soft" color="success"/>
                    </RadioGroup>
                </FilterAccordion>
                <FilterAccordion heading={"Price Range"}>
                    <RadioGroup defaultValue="allproducts" >
                        <Radio size="lg" value="allproducts" label="All Products" variant="soft" color="success"/>
                        <Radio size="lg" value="fruit" label="Fruit" variant="soft" color="success"/>
                        <Radio size="lg" value="vegetables" label="Vegetables" variant="soft"  color="success"/>
                        <Radio size="lg" value="eggs" label="Eggs" variant="soft" color="success"/>
                        <Radio size="lg" value="milk" label="Milk" variant="soft" color="success"/>
                    </RadioGroup>
                </FilterAccordion>
                <FilterAccordion heading={"Ratings"}>
                    <RadioGroup defaultValue="allproducts" >
                        <Radio size="lg" value="allproducts" label="All Products" variant="soft" color="success"/>
                        <Radio size="lg" value="fruit" label="Fruit" variant="soft" color="success"/>
                        <Radio size="lg" value="vegetables" label="Vegetables" variant="soft"  color="success"/>
                        <Radio size="lg" value="eggs" label="Eggs" variant="soft" color="success"/>
                        <Radio size="lg" value="milk" label="Milk" variant="soft" color="success"/>
                    </RadioGroup>
                </FilterAccordion>
            </FilterSidebar>
            <ProductContainer>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </ProductContainer>
        </div>
    )
}

export default ProductsPage;
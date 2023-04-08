import { Radio, RadioGroup } from "@mui/joy";
import FilterAccordion from "../components/filter/FilterAccordion";
import FilterSidebar from "../components/filter/FilterSidebar";
import ProductContainer from "../components/products/ProductContainer";
import styles from "./ProductsPage.module.scss";
import ProductCard from "../components/generalcards/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductsPage = () => {

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/products")
            console.log(result.data)
            setProducts(result.data)
        }
        fetchData();
    }, [])

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
                {products ? products.map(product => <ProductCard key={product._id} product={product}/>) : null}
            </ProductContainer>
        </div>
    )
}

export default ProductsPage;
import { Radio, RadioGroup } from "@mui/joy";
import FilterAccordion from "../components/filter/FilterAccordion";
import FilterSidebar from "../components/filter/FilterSidebar";
import ProductContainer from "../components/products/ProductContainer";
import styles from "./ProductsPage.module.scss";
import ProductCard from "../components/generalcards/ProductCard";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBasedOnQuery, nextPage, selectCurrentPage, selectProductData, selectTotalPages } from "../reducers/productSearchSlice";
import { useParams, useSearchParams } from "react-router-dom";
import PageNavigationBar from "../components/products/PageNavigationBar";

const ProductsPage = () => {

    const dispatch = useDispatch();
    const productDataState = useSelector(selectProductData);
    const pageState = useSelector(selectCurrentPage)
    const totalPages = useSelector(selectTotalPages)
    const [searchParams]= useSearchParams();

    const [productType, setProductType] = useState("allproducts")

    useEffect(() => {
        const name = searchParams.get("name")
        const page = pageState
        const query = { name, page }
        dispatch(fetchProductsBasedOnQuery(query))
        console.log(name)
    }, [pageState])

    const memoizedCards = useMemo(() => {
        return productDataState.map(product => <ProductCard key={product._id} product={product}/>)
    }, [productDataState])


    // const handleScroll = () => {
    //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //         dispatch(nextPage())
    //     };
    // }

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // },[pageState])

    return (
        <div className={styles.productsPageWrapper}>
            <div>
                <span>Search Results</span>
            </div>
            <FilterSidebar>
                <FilterAccordion heading={"Products"}>
                    <RadioGroup defaultValue="allproducts" >
                        <Radio size="lg" value="allproducts" label="All Products" variant="soft" color="success"/>
                        <Radio size="lg" value="fruit" label="Fruit" variant="soft" color="success"/>
                        <Radio size="lg" value="vegetables" label="Vegetables" variant="soft"  color="success"/>
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
                {productDataState ? memoizedCards : null}
                {productDataState ? console.log(productDataState) : null}
            </ProductContainer>
            {/** TODO: Page Bar */}
            <PageNavigationBar totalPages={totalPages} currentPage={pageState}/>
        </div>
    )
}

export default ProductsPage;
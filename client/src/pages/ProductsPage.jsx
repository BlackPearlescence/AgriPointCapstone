import { Radio, RadioGroup } from "@mui/joy";
import FilterAccordion from "../components/filter/FilterAccordion";
import FilterSidebar from "../components/filter/FilterSidebar";
import ProductContainer from "../components/products/ProductContainer";
import styles from "./ProductsPage.module.scss";
import ProductCard from "../components/generalcards/ProductCard";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBasedOnQuery, nextPage, selectCurrentPage, selectFilteredProductData, selectProductData, selectTotalPages, setFilteredProductData, setProductData } from "../reducers/productSearchSlice";
import { useParams, useSearchParams } from "react-router-dom";
import PageNavigationBar from "../components/products/PageNavigationBar";

const ProductsPage = () => {

    const dispatch = useDispatch();
    const productDataState = useSelector(selectProductData);
    const pageState = useSelector(selectCurrentPage)
    const totalPages = useSelector(selectTotalPages)
    const filteredProducts = useSelector(selectFilteredProductData)
    const [searchParams]= useSearchParams();

    const [productType, setProductType] = useState("")

    useEffect(() => {
        const name = searchParams.get("name")
        const page = pageState
        const query = { name, page }
        dispatch(fetchProductsBasedOnQuery(query))
        console.log(name)
    }, [pageState])

    useEffect(() => {
        dispatch(setFilteredProductData(productDataState.filter(product => product.vegetation_type === productType)))
    }, [productType])
    


    // // This triggers whenever filters change
    // useEffect(() => {
    //     const name = searchParams.get("name")
    //     const page = pageState
    //     const query = { name, page }
    //     dispatch(fetchProductsBasedOnQuery(query))
    //     dispatch(setProductData( productDataState.filter(product => product.vegetation_type === productType)))
    // }, [productType])

    const memoizedCards = useMemo(() => {
        return productDataState.map(product => <ProductCard key={product._id} product={product}/>)
    }, [productDataState])

    const handleProductTypeChange = (e) => {
        setProductType(e.target.value)
        console.log(productType)
    }


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
                    <RadioGroup defaultValue="allproducts" onChange={handleProductTypeChange} >
                        <Radio size="lg" value="" label="All Products" variant="soft" color="success"/>
                        <Radio size="lg" value="fruit" label="Fruit" variant="soft" color="success"/>
                        <Radio size="lg" value="vegetable" label="Vegetables" variant="soft"  color="success"/>
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
                {productDataState ? console.log(memoizedCards) : null}
            </ProductContainer>
            {/** TODO: Page Bar */}
            <PageNavigationBar totalPages={totalPages} currentPage={pageState}/>
        </div>
    )
}

export default ProductsPage;
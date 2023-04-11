import { Box, Radio, RadioGroup, Slider } from "@mui/joy";
import FilterAccordion from "../components/filter/FilterAccordion";
import FilterSidebar from "../components/filter/FilterSidebar";
import ProductContainer from "../components/products/ProductContainer";
import styles from "./ProductsPage.module.scss";
import ProductCard from "../components/generalcards/ProductCard";
import  Rating from "@mui/material/Rating"

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBasedOnQuery, nextPage, resetPage, selectCurrentPage, selectFilteredProductData, selectNumberOfResults, selectProductData, selectTotalPages, setFilteredProductData, setProductData } from "../reducers/productSearchSlice";
import { useParams, useSearchParams } from "react-router-dom";
import PageNavigationBar from "../components/products/PageNavigationBar";

const ProductsPage = () => {

    const dispatch = useDispatch();
    const productDataState = useSelector(selectProductData);
    const pageState = useSelector(selectCurrentPage)
    const totalPages = useSelector(selectTotalPages)
    const numberOfResults = useSelector(selectNumberOfResults)
    const [searchParams]= useSearchParams();

    const [productType, setProductType] = useState("allproducts")
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [priceRangeValue, setPriceRangeValue] = useState([0, 1000])
    const [ratings, setRatings] = useState([0,5])
    const [ratingsValue, setRatingsValue] = useState([0,5])
    const [sort, setSort] = useState("")  

    useEffect(() => {
        const name = searchParams.get("name")
        // const priceRange = searchParams.get("pricerange")
        // const ratings = searchParams.get("ratings")
        // const type = searchParams.get("type")
        const query = { name, pageState }
        dispatch(fetchProductsBasedOnQuery(query))
        console.log(name)
    }, [pageState])

    // useEffect(() => {
    //     const name = searchParams.get("name")
    //     const query = { name, pageState, productType, priceRange, ratings}
    //     console.log(productType)
    //     dispatch(fetchProductsBasedOnQuery(query))
    // }, [productType, priceRangeValue, ratingsValue])
    


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
        dispatch(resetPage())
    }

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value)
        dispatch(resetPage())
    }

    const handleRatingsChange = (e) => {
        setRatings(e.target.value)
        dispatch(resetPage())
    }

    const handlePriceRangeChosenMouseUp = (e) => {
        setPriceRangeValue(priceRange)
    }

    const handleRatingsChosenMouseUp = (e) => {
        setRatingsValue(ratings)
    }

    const handleSendFilterQuery = (e) => {
        const name = searchParams.get("name")
        const query = { name, pageState, productType, priceRange, ratings}
        console.log(productType)
        dispatch(fetchProductsBasedOnQuery(query))
    }

    const handleResetFilters = (e) => {
        setProductType("allproducts")
        setPriceRange([0, 1000])
        setPriceRangeValue([0, 1000])
        setRatings([0,5])
        setRatingsValue([0,5])
        dispatch(resetPage())
        const query = { name: searchParams.get("name"), pageState: 1 }
        dispatch(fetchProductsBasedOnQuery(query))
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
                <span>Search Results ({numberOfResults})</span>
            </div>
            <FilterSidebar handleApplyFilters={handleSendFilterQuery} handleResetFilters={handleResetFilters}>
                <FilterAccordion heading={"Products"}>
                    <RadioGroup onChange={handleProductTypeChange} >
                        <Radio size="lg" value="allproducts" label="All Products" variant="soft" color="success"/>

                        <Radio size="lg" value="fruit" label="Fruit" variant="soft" color="success"/>
                        <Radio size="lg" value="vegetable" label="Vegetables" variant="soft"  color="success"/>
                    </RadioGroup>
                </FilterAccordion>
                <FilterAccordion heading={"Price Range"}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}} >
                        <h3>${priceRange[0]}</h3>
                        <Slider
                            value={priceRange}
                            sx={{ padding: "0px", width: "300px" }}
                            onChange={handlePriceRangeChange}
                            onMouseUp={handlePriceRangeChosenMouseUp}
                            min={0}
                            max={1000}
                            step={1}
                        />
                        <h3>${priceRange[1]}</h3>
                    </Box>
                </FilterAccordion>
                <FilterAccordion heading={"Ratings"}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}} >
                        <h3>{ratings[0]}</h3>
                            <Slider
                                value={ratings}
                                sx={{ padding: "0px", width: "300px" }}
                                onChange={handleRatingsChange}
                                onMouseUp={handleRatingsChosenMouseUp}
                                min={0}
                                max={5}
                                step={1}
                            />
                        <h3>{ratings[1]}</h3>               
                    </Box>
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
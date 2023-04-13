import ContentDisplaySection from "../components/home/ContentDisplaySection";
import HomeHero from "../components/home/HomeHero";
import ProductCard from "../components/generalcards/ProductCard";
import ContentDisplayContainer from "../components/home/ContentDisplayContainer";
import VendorCard from "../components/generalcards/VendorCard";
import styles from "./HomePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchHomeProducts, 
    selectCheeseProductsData,
    selectFlowerProductsData,
    selectGreatProductDealsData,
    selectInterestedProductsData,
    selectNewVeggiesData,
    selectNewFruitsData
 } from "../reducers/productHomeSlice";
import { useEffect, useMemo } from "react";

const HomePage = () => {

    const dispatch = useDispatch();
    const newFruitsState = useSelector(selectNewFruitsData);
    const interestedState = useSelector(selectInterestedProductsData);
    const newVeggiesState = useSelector(selectNewVeggiesData);
    const cheeseProductsState = useSelector(selectCheeseProductsData);
    const flowerProductsState = useSelector(selectFlowerProductsData);
    const greatDealsState = useSelector(selectGreatProductDealsData);

    const memoizedFetchHomeProducts = useMemo(() => {
        return () => dispatch(fetchHomeProducts())
    }, [dispatch])

    useEffect(() => {memoizedFetchHomeProducts()}, [memoizedFetchHomeProducts])

    // TODO: Create algorithm to display products based on seasonality
    return (
        <div>
            <HomeHero />
            <ContentDisplayContainer>
                <ContentDisplaySection heading={"In Season!"}>
                    {newFruitsState ? newFruitsState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>
                <ContentDisplaySection heading={"New Fruits!"}>
                    {interestedState ? interestedState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>
                <ContentDisplaySection heading={"...and New Veggies!"}>
                    {newVeggiesState ? newVeggiesState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Vendor Spotlight"}>
                    <VendorCard />
                    <VendorCard />
                    <VendorCard />
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Great Deals!"}>
                    {greatDealsState ? greatDealsState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Bouquets for all!"}>
                    {flowerProductsState ? flowerProductsState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Cheeses"}>
                    {cheeseProductsState ? cheeseProductsState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>

                <ContentDisplaySection heading={"New Vendors"}>
                    <VendorCard />
                    <VendorCard />
                    <VendorCard />
                    <VendorCard />
                    <VendorCard />
                    <VendorCard />
                </ContentDisplaySection>
            </ContentDisplayContainer>
        </div>
    )
}

export default HomePage;
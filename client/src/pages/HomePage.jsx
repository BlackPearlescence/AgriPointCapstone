import ContentDisplaySection from "../components/home/ContentDisplaySection";
import HomeHero from "../components/home/HomeHero";
import ProductCard from "../components/generalcards/ProductCard";
import ContentDisplayContainer from "../components/home/ContentDisplayContainer";
import VendorCard from "../components/generalcards/VendorCard";
import styles from "./HomePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchHomeProducts, 
    selectNewProductsData, 
    selectCheeseProductsData,
    selectInSeasonProductsData,
    selectFlowerProductsData,
    selectGreatProductDealsData,
    selectInterestedProductsData
 } from "../reducers/productHomeSlice";
import { useEffect } from "react";

const HomePage = () => {

    const dispatch = useDispatch();
    const inSeasonState = useSelector(selectInSeasonProductsData);
    const interestedState = useSelector(selectInterestedProductsData);
    const newProductsState = useSelector(selectNewProductsData);
    const cheeseProductsState = useSelector(selectCheeseProductsData);
    const flowerProductsState = useSelector(selectFlowerProductsData);
    const greatDealsState = useSelector(selectGreatProductDealsData);

    useEffect(() => {dispatch(fetchHomeProducts())}, [])

    // TODO: Create algorithm to display products based on seasonality
    return (
        <div>
            <HomeHero />
            <ContentDisplayContainer>
                <ContentDisplaySection heading={"In Season!"}>
                    {inSeasonState ? inSeasonState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>
                <ContentDisplaySection heading={"Things you might be interested in..."}>
                    {interestedState ? interestedState.map(product => <ProductCard key={product._id} product={product}/>) : null}
                </ContentDisplaySection>
                <ContentDisplaySection heading={"New Products"}>
                    {newProductsState ? newProductsState.map(product => <ProductCard key={product._id} product={product}/>) : null}
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
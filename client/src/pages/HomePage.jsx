import ContentDisplaySection from "../components/home/ContentDisplaySection";
import HomeHero from "../components/home/HomeHero";
import ProductCard from "../components/generalcards/ProductCard";
import ContentDisplayContainer from "../components/home/ContentDisplayContainer";
import VendorCard from "../components/generalcards/VendorCard";
import styles from "./HomePage.module.scss";

const HomePage = () => {

    return (
        <div>
            <HomeHero />
            <ContentDisplayContainer>
                <ContentDisplaySection heading={"In Season!"}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Things you might be interested in..."}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </ContentDisplaySection>

                <ContentDisplaySection heading={"New Products"}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Vendor Spotlight"}>
                    <VendorCard />
                    <VendorCard />
                    <VendorCard />
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Great Deals!"}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Bouquets for all!"}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </ContentDisplaySection>

                <ContentDisplaySection heading={"Cheeses"}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
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
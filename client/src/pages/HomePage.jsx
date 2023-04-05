import ContentDisplaySection from "../components/ContentDisplaySection";
import HomeHero from "../components/HomeHero";
import ProductCard from "../components/ProductCard";
import ProductDisplayContainer from "../components/ProductDisplayContainer";
import VendorCard from "../components/VendorCard";
import styles from "./HomePage.module.scss";

const HomePage = () => {

    return (
        <div>
            <HomeHero />
            <ProductDisplayContainer>
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
            </ProductDisplayContainer>
        </div>
    )
}

export default HomePage;
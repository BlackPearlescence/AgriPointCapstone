import HomeHero from "../components/HomeHero";
import ProductDisplayContainer from "../components/ProductDisplayContainer";
import styles from "./HomePage.module.scss";

const HomePage = () => {

    return (
        <div>
            <HomeHero />
            <ProductDisplayContainer>
                <div className={styles.gridItem1}></div>
                <div className={styles.gridItem2}></div>
                <div className={styles.gridItem3}></div>
                <div className={styles.gridItem4}></div>
                <div className={styles.gridItem5}></div>
                <div className={styles.gridItem6}></div>
                <div className={styles.gridItem7}></div>
                <div className={styles.gridItem8}></div>
            </ProductDisplayContainer>
        </div>
    )
}

export default HomePage;
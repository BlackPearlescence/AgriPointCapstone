import styles from "./ProductDisplay.module.scss"

const ProductDisplay = () => {

    return(
        <div className={styles.productDisplayContainer}>
            <h4>PRODUCT DISPLAY TITLE</h4>
            <div className={styles.productItemsGrid}>
                <img src="http://via.placeholder.com/640x360" />
                <img src="http://via.placeholder.com/640x360" />
                <img src="http://via.placeholder.com/640x360" />
                <img src="http://via.placeholder.com/640x360" />
            </div>
        </div>
    )
}

export default ProductDisplay;
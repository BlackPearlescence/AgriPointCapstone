import styles from "./ProductViewLayout.module.scss";

const ProductViewLayout = ({ children, product }) => {
    
    return(
        <div className={styles.productViewWrapper}>
            <div>
                <h1>Some goddamn product</h1>
            </div>
            <div>
                <h1>Some goddamn product information</h1>
            </div>
            <div>
                <h1>Some goddamn product image</h1>
            </div>
            <div>
                <h1>Some goddamn product description</h1>
            </div>
            <div>
                <h1>Some goddamn product call-to-action</h1>
            </div>
        </div>
    )
}

export default ProductViewLayout
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {

    return(
        <div className={styles.productCardContainer}>
            <img src={product.image_url} alt="a product image" />
            <span className={styles.productTitle}>{product.name}</span>
            <span className={styles.priceTag}>${product.price}</span>
            <div className={styles.addToCartContainer}>
                <button>Add to Cart</button>
                <input type="number" placeholder="Quantity" min={0}/>
            </div>
            <a href="#">{product.vendor.name}</a>
            <a>Add to List</a>
        </div>
    )
}

export default ProductCard;
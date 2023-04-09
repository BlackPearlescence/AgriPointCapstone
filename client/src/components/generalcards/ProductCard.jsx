import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {

    return(
        <div className={styles.productCardContainer}>
            <img src="https://i.imgur.com/5l2UobM.jpg" alt="a product image" />
            <span className={styles.productTitle}>{product.name}</span>
            <span className={styles.priceTag}>${25.00}</span>
            <div className={styles.addToCartContainer}>
                <button>Add to Cart</button>
                <input type="number" placeholder="Quantity" min={0}/>
            </div>
            <a href="#">Shop Burpee Gardens</a>
            <a>Add to List</a>
        </div>
    )
}

export default ProductCard;
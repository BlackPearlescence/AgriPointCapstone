import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {

    return(
        <div className={styles.productCardContainer}>
            <img src="http://via.placeholder.com/640x360" alt="a product image" />
            <span>Granny Smith Apples</span>
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
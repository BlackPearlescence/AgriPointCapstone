import { Box } from "@mui/joy";
import styles from "./ProductCard.module.scss";
import  Rating from "@mui/material/Rating"


const ProductCard = ({ product }) => {

    return(
        <div className={styles.productCardContainer}>
            <img src={product.image_url} alt="a product image" />
            <span className={styles.productTitle}>{product.name}</span>
            <span className={styles.priceTag}>${product.price}</span>
            <Box>
                <Rating name="read-only"  value={product.statistics.average_rating} min={0} max={5} readOnly/>
            </Box>
            <div className={styles.addToCartContainer}>
                <button>Add to Cart</button>
                <input type="number" placeholder="Quantity" min={0}/>
            </div>
            <a href="#" className={styles.storeLink}>Check out {product.vendor.name}</a>
            <a>Add to List</a>
        </div>
    )
}

export default ProductCard;
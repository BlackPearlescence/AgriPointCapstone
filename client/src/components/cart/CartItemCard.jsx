import styles from "./CartItemCard.module.scss";

const CartItemCard = ({ cartItem }) => {
    
    return (
        <div className={styles.cartItemContainer}>
            <img src={cartItem.image_url} alt="a product image" />
            <div className={styles.cartItemDetailsContainer}>
                <h6>{cartItem.name}</h6>
                <input type="number" defaultValue={1} min={1}/>
                <button>Remove from Cart</button>
            </div>
        </div>
    )
}


export default CartItemCard;

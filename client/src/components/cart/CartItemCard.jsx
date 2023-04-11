import styles from "./CartItemCard.module.scss";

const CartItemCard = () => {
    
    return (
        <div className={styles.cartItemContainer}>
            <img src={"http://via.placeholder.com/640x360"} alt="a product image" />
            <div className={styles.cartItemDetailsContainer}>
                <h6>Cart Item</h6>
                <input type="number" defaultValue={1} min={1}/>
                <button>Remove from Cart</button>
            </div>
        </div>
    )
}


export default CartItemCard;

import { useDispatch, useSelector } from "react-redux";
import styles from "./CartItemCard.module.scss";
import { getCart, removeFromCart, selectMyCart, updateCartItemQuantity } from "../../reducers/cartSlice";
import { useEffect, useState } from "react";
import { selectCustomerDetails } from "../../reducers/loginSlice";

const CartItemCard = ({ cartItem }) => {

    const cartState = useSelector(selectMyCart)
    const dispatch = useDispatch()
    const customerDetailsState = useSelector(selectCustomerDetails)
    const [itemQuantity, setItemQuantity] = useState(0)

    // Rerenender the cart when the quantity is changed
    useEffect(() => {
        dispatch(getCart(customerDetailsState._id))
    },[])

    const handleCartRemoval = () => {
        const customer = customerDetailsState._id
        const product = cartItem.product._id
        dispatch(removeFromCart({ customer, product }))
        dispatch(getCart(customerDetailsState._id))
    }

    const handleCartUpdate = (e) => {
        const customer = customerDetailsState._id
        const product = cartItem.product._id
        dispatch(updateCartItemQuantity({customer, product, quantity: e.target.value }))
    }
    
    return (
        <div className={styles.cartItemContainer}>
            <img src={cartItem.product.image_url} alt="a product image" />
            <div className={styles.cartItemDetailsContainer}>
                <h6 className={styles.productTitle}>{cartItem.product.name}</h6>
                <h6 className={styles.priceField}>${cartItem.product.price * cartItem.quantity}</h6>
                <h6 className={styles.sizeField}>{cartItem.size_name}</h6>
                <input className={styles.quantityPicker} type="number"defaultValue={cartItem.quantity} min={1} onChange={handleCartUpdate}/>
                <button className={styles.removeFromCart} onClick={handleCartRemoval}>Remove from Cart</button>
            </div>
        </div>
    )
}


export default CartItemCard;

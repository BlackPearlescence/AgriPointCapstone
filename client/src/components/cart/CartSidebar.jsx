import { Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { getCart, hideCart, selectCartShown, selectMyCart, showCart } from "../../reducers/cartSlice";
import CartItemCard from "./CartItemCard";
import styles from "./CartSidebar.module.scss";
import { useEffect } from "react";
import { selectCustomerDetails } from "../../reducers/loginSlice";

const CartSidebar = () => {

    const dispatch = useDispatch()
    const cartShownState = useSelector(selectCartShown)
    const cartState = useSelector(selectMyCart)
    const customerDetailsState = useSelector(selectCustomerDetails)

    // useEffect(() => {
    //     dispatch(showCart())
    // },[cartState])

    return (
        <Offcanvas className={styles.cartContainer} show={cartShownState} onHide={() => dispatch(hideCart())} onShow={() => dispatch(showCart())} placement="end">
            <div className={styles.cartHeader}>My Cart</div>
            {cartState.length > 0 && cartState.map((cartItem) => {
                return(
                    <CartItemCard cartItem={cartItem} />
                )
            }) }
            { cartState.length === 0 ?  <div className={styles.emptyCart}>Your cart is empty</div> : 
            <div className={styles.cartFooter}>Total: ${cartState.length > 0 && cartState.reduce(
                (accumulator, cartItem) => {
                    return accumulator + cartItem.size_item_count * cartItem.quantity * cartItem.product.price
                },0)}</div>}
            
        </Offcanvas> 
    )
}

export default CartSidebar;
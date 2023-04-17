import { Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCartItems, getCart, hideCart, proceedToCheckout, selectCartShown, selectCheckoutShown, selectMyCart, showCart, showCheckout } from "../../reducers/cartSlice";
import CartItemCard from "./CartItemCard";
import styles from "./CartSidebar.module.scss";
import { useEffect } from "react";
import { selectCustomerDetails } from "../../reducers/loginSlice";
import { createPaymentIntent } from "../../reducers/stripeSlice";

const CartSidebar = () => {

    const dispatch = useDispatch()
    const cartShownState = useSelector(selectCartShown)
    const cartState = useSelector(selectMyCart)
    const customerDetailsState = useSelector(selectCustomerDetails)
    const checkoutShownState = useSelector(selectCheckoutShown)

    // useEffect(() => {
    //     dispatch(showCart())
    // },[cartState])

    const handleRemoveAllFromCart = () => {
        const customer = customerDetailsState._id
        dispatch(deleteAllCartItems(customer))
        dispatch(getCart(customerDetailsState._id))
    }

    const handleCheckoutSession = () => {
        dispatch(createPaymentIntent(customerDetailsState._id))
        dispatch(proceedToCheckout())
    }

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
                { cartState.length > 0 && <button onClick={handleCheckoutSession} className={styles.proceedToCheckoutBtn}>Proceed to Checkout</button>}
                { cartState.length > 0 && <button onClick={handleRemoveAllFromCart} className={styles.clearCartBtn}>Clear Cart</button>}
               
            
        </Offcanvas> 
    )
}

export default CartSidebar;
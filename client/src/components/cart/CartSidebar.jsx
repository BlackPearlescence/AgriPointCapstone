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

    useEffect(() => {
        dispatch(getCart(customerDetailsState._id))
    },[cartShownState])

    return (
        <Offcanvas className={styles.cartContainer} show={cartShownState} onHide={() => dispatch(hideCart())} onShow={() => dispatch(showCart())} placement="end">
            <div className={styles.cartHeader}>My Cart</div>
            {cartState ? cartState.map((cartItem) => {
                return(
                    <CartItemCard />
                )
            }) : null}
            <CartItemCard />
            <CartItemCard />
            <CartItemCard />
        </Offcanvas> 
    )
}

export default CartSidebar;
import { Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { hideCart, selectCartShown, showCart } from "../../reducers/cartSlice";
import CartItemCard from "./CartItemCard";
import styles from "./CartSidebar.module.scss";

const CartSidebar = () => {

    const dispatch = useDispatch()
    const cartShownState = useSelector(selectCartShown)

    return (
        <Offcanvas className={styles.cartContainer} show={cartShownState} onHide={() => dispatch(hideCart())} onShow={() => dispatch(showCart())} placement="end">
            <div className={styles.cartHeader}>My Cart</div>
            <CartItemCard />
            <CartItemCard />
            <CartItemCard />
        </Offcanvas> 
    )
}

export default CartSidebar;
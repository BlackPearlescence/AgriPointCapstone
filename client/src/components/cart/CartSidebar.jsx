import { Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { hideCart, selectCartShown, showCart } from "../../reducers/cartSlice";

const CartSidebar = () => {

    const dispatch = useDispatch()
    const cartShownState = useSelector(selectCartShown)

    return (
        <Offcanvas show={cartShownState} onHide={() => dispatch(hideCart())} onShow={() => dispatch(showCart())} placement="end">

        </Offcanvas>
    )
}

export default CartSidebar;
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../reducers/loginSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import OrdersContainer from "../components/orders/OrdersContainer";
import OrderCard from "../components/orders/OrderCard";
import styles from "./OrdersPage.module.scss";


const OrdersPage = () => {
    
    const isLoggedInState = useSelector(selectLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedInState) {
            navigate("/")
        }
    },[])
    return (
        <div>
            <h3 className={styles.myOrdersHeader}>My Orders</h3>
            <OrdersContainer>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </OrdersContainer>
        </div>
    )
}

export default OrdersPage;
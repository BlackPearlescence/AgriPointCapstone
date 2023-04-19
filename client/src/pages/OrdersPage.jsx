import { useSelector } from "react-redux";
import { selectLoggedIn } from "../reducers/loginSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


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
            <h3>My Orders</h3>

        </div>
    )
}

export default OrdersPage;
import { Badge, Divider, IconButton, Input, Option, Select } from "@mui/joy";
import styles from "./TopNavigationBar.module.scss";
import { GrNotification, GrCart, GrSearch, GrDown } from "react-icons/gr";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../modals/LoginModal"
import { makeLogoutRequest, selectCustomerDetails, selectLoggedIn, showLogin } from "../../reducers/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectMyCart, showCart } from "../../reducers/cartSlice";
import Cookies from "js-cookie";

const TopNavigationBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState("")

    const cartState = useSelector(selectMyCart)
    const isLoggedInState = useSelector(selectLoggedIn)
    const customerDetails = useSelector(selectCustomerDetails)

    const handleSearchQuerySubmit = (e) => {
        e.preventDefault()
        navigate(`/products?name=${searchQuery}`)
    }

    const handleLogout = () => {
        dispatch(makeLogoutRequest())
        navigate("/home")
    }
   

    return(
        <div className={styles.topContainer}>
            <div className={styles.navigationBrandContainer} onClick={() => navigate("/home")}>
                <img className={styles.brandLogo} src={require("../../images/IconOnly_Transparent_NoBuffer.png")} />
                <img className={styles.brandTextLogo} src={require("../../images/FullLogo_Transparent_NoBuffer (2).png")} />
            </div>
           
            <form className={styles.searchBarContainer} onSubmit={handleSearchQuerySubmit}>
                {/** Select is for search by department */}
                <Input 
                sx={{ '--Input-decoratorChildHeight': '45px', width: "50rem"}}
                placeholder="Search AgriPoint" 
                startDecorator={
                    <React.Fragment>
                        <Select sx={{ height: "45px", right:"11px", borderBottomRightRadius: 0, borderTopRightRadius: 0 }} placeholder="All" indicator={<GrDown/>}>
                            <Option value="fruit">Fruit</Option>
                            <Option value="veggies">Veggies</Option>
                            <Option value="nuts">Nuts</Option>
                        </Select>
                    </React.Fragment>
                }
                endDecorator={
                    <React.Fragment>
                        <Divider orientation="vertical"/>
                        <IconButton sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: "#0FD160", color: "white"}} type="submit"><GrSearch/></IconButton>
                    </React.Fragment>
                }
                onChange={(e) => setSearchQuery((prevSearchQuery) => e.target.value)}/>
            </form>
            <div className={styles.topLinksContainer}>
                {isLoggedInState ? <a href="#" onClick={() => handleLogout()}>Hi, {customerDetails.first_name}</a> :
                <a href="#" onClick={() => dispatch(showLogin())}>Sign In</a>}
                
                <a href="#" >Orders</a>
                <a href="#"><GrNotification size="30"/></a>
                <a href="#" onClick={() => dispatch(showCart())}><Badge badgeContent={cartState.size}><GrCart size="30"/></Badge></a>
            </div>
        </div>
    )
}

export default TopNavigationBar;
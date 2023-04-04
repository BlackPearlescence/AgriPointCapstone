import { Divider, IconButton, Input, Option, Select } from "@mui/joy";
import styles from "./TopNavigationBar.module.scss";
import { GrNotification, GrCart, GrSearch, GrDown } from "react-icons/gr";
import React from "react";

const TopNavigationBar = () => {
    return(
        <div className={styles.topContainer}>
            <a href="#">
                <div className={styles.navigationBrandContainer}>
                    <img className={styles.brandLogo} src={require("../images/IconOnly_Transparent_NoBuffer.png")} />
                    <img className={styles.brandTextLogo} src={require("../images/FullLogo_Transparent_NoBuffer (2).png")} />
                </div>
            </a>
           
            <form className={styles.searchBarContainer}>
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
                }/>
            </form>
            <div className={styles.topLinksContainer}>
                <a href="#">Log In</a>
                <a href="#" >Orders</a>
                <a href="#"><GrNotification size="30"/></a>
                <a href="#"><GrCart size="30"/></a>
            </div>
        </div>
    )
}

export default TopNavigationBar;
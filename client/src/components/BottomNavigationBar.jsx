import { useState } from "react";
import styles from "./BottomNavigationBar.module.scss";
import { Drawer, ListItemIcon, ListItemText } from "@mui/material";
import { Divider, List, ListItem, ListItemButton, Typography } from "@mui/joy";
import { GiFruitBowl } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

const BottomNavigationBar = () => {
    const [sidebarState, setSidebarState] = useState(false)
    return (
        <div className={styles.bottomNavigationContainer}>
            <a onClick={() => setSidebarState(true)} href="#">All</a>
            <a href="#">Fruits</a>
            <a href="#">Veggies</a>
            <a href="#">Dairy</a>
            <a href="#">Eggs</a>
            <a href="#">Flowers</a>
            <a href="#">Edible Seeds</a>
            <a href="#">Deals</a>
            <a href="#">Vendors</a>
            <Drawer sx={{ display: "flex", justifyContent: "center"}} anchor="left" open={sidebarState} onClose={() => setSidebarState(false)}>
                <div className={styles.sidebarContainer}>
                    <div className={styles.sidebarHeaderContainer}>
                        <FaUserCircle color="white" />
                        <span>Hello, Me</span>
                    </div>
                    <ul>
                        <li><div>Fruit & Veggies</div></li>
                        <li><a href="#">Apples</a></li>
                        <li><a href="#">Berries</a></li>
                        <li><a href="#">Grapes</a></li>
                        <li><a href="#">Bananas</a></li>
                        <li><a href="#">Pumpkins</a></li>
                        <li><a href="#">Beets</a></li>
                        <li><a href="#">Carrots</a></li>
                        <li><a href="#">Exotic Selections</a></li>
                        <li><div>Dairy Products</div></li>
                        <li><a href="#">Cow Milk</a></li>
                        <li><a href="#">Goat Milk</a></li>
                        <li><a href="#">Camel Milk</a></li>
                        <li><a href="#">Cheeses</a></li>
                        <li><div>Flowers</div></li>
                        <li><a href="#">Roses</a></li>
                        <li><a href="#">Lilies</a></li>
                        <li><a href="#">Daisies</a></li>
                        <li><a href="#">Rhododenrons</a></li>
                        <li><a href="#">Tulips</a></li>
                        <li><div>Eggs</div></li>
                        <li><a href="#">Chicken Eggs</a></li>
                        <li><a href="#">Quail Eggs</a></li>
                        <li><a href="#">Ostrich Eggs</a></li>
                        <li><div>Edible Seeds</div></li>
                        <li><a href="#">Sunflower Seeds</a></li>
                        <li><a href="#">Pumpkin Seeds</a></li>
                        <li><div>Help & Settings</div></li>
                        <li><a href="#">My Account</a></li>
                        <li><a href="#">Sign Out</a></li>
                    </ul>
                </div>
            </Drawer>
        </div>
    )
}

export default BottomNavigationBar;
import { useState } from "react"
import styles from "./BottomNavigationBar.module.scss"
import { Drawer } from "@mui/material"

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
            <Drawer anchor="left" open={sidebarState} onClose={() => setSidebarState(false)}>
                <h3>BLOOD</h3>
            </Drawer>
        </div>
    )
}

export default BottomNavigationBar;
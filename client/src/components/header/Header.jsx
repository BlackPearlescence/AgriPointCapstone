import TopNavigationBar from "./TopNavigationBar";
import styles from "./Header.module.scss";
import BottomNavigationBar from "./BottomNavigationBar";

const Header = () => {

    return(
        <div className={styles.headerContainer}>
            <TopNavigationBar />
            <BottomNavigationBar />
        </div>
    )
}

export default Header;
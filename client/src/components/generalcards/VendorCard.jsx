import styles from "./VendorCard.module.scss";

const VendorCard = ({ vendor }) => {

    return (
        <div className={styles.vendorCardContainer}>
            <img src="http://via.placeholder.com/640x360" alt="vendor image" />
            <div className={styles.vendorInformation}>
                <span>Burpee Gardens</span>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                    in culpa qui officia deserunt mollit anim id est laborum.  
                </p>
                <a href="#">Check it Out!</a>
            </div>
        </div>
    )
}

export default VendorCard;
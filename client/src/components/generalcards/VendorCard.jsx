import styles from "./VendorCard.module.scss";

const VendorCard = ({ vendor }) => {

    return (
        <div className={styles.vendorCardContainer}>
            <img src={vendor.image_url} alt="vendor image" />
            <div className={styles.vendorInformation}>
                <span>{vendor.name}</span>
                <p>{vendor.description}</p>
                <a href="#">Check it Out!</a>
            </div>
        </div>
    )
}

export default VendorCard;
import styles from "./OrderCard.module.scss";

const OrderCard = () => {

    return (
        <div className={styles.orderCardContainer}>
            <span className={styles.orderCardHeader}>Order no.feafaeofjeaojfoeapjfpea</span>
            <div className={styles.orderCardDataContainer}>
                <div className={styles.orderCardInformation}>
                    <span>Placed At: NEVER</span>
                    <span>Status: NEVER COMING</span>
                </div>
                <div className={styles.orderCardContentsWrapper}>
                    <img src="http://via.placeholder.com/640x360" alt="a product image"/>
                    <img src="http://via.placeholder.com/640x360" alt="a product image"/>
                    <img src="http://via.placeholder.com/640x360" alt="a product image"/>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;
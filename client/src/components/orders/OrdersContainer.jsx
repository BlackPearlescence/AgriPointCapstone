import styles from "./OrdersContainer.module.scss";

const OrdersContainer = ({ children }) => {

    return (
        <div className={styles.ordersWrapper}>
            {children}
        </div>
    )
}

export default OrdersContainer;
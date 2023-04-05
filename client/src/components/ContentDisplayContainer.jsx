import styles from "./ContentDisplayContainer.module.scss";

const ContentDisplayContainer = ({ children }) => {

    return(
        <div className={styles.productWrapper}>
            {children}
        </div>
    )
}

export default ContentDisplayContainer;
import styles from "./ContentDisplaySection.module.scss"

const ContentDisplaySection = ({ children, heading }) => {

    return (
        <div className={styles.sectionContainer}>
            <h2>{heading}</h2>
            <div className={styles.contentContainer}>
                {children}
            </div>
        </div>
    )
}

export default ContentDisplaySection;
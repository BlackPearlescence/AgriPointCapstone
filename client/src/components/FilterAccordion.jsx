import { useState } from "react";
import styles from "./FilterAccordion.module.scss";

const FilterAccordion = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleAccordionBoxToggle = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div className={styles.filterBox} >
            <div className={styles.filterHeading} onClick={handleAccordionBoxToggle}>
                <span>Accordion Heading</span>
                <span>Symbol</span>
            </div>
            <div className={isOpen ? styles.filterOptionsContainerShow : styles.filterOptionsContainer} >
                {children}
            </div>
        </div>
    )
}

export default FilterAccordion;
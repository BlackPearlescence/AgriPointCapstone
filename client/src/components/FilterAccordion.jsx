import { useState } from "react";
import styles from "./FilterAccordion.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

const FilterAccordion = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleAccordionBoxToggle = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div className={styles.filterBox} >
            <div className={isOpen ? styles.filterHeadingShow : styles.filterHeading} onClick={handleAccordionBoxToggle}>
                <span>Accordion Heading</span>
                {isOpen ? <AiOutlineMinus fontSize={30}/> : <AiOutlinePlus fontSize={30}/>}
            </div>
            <div className={isOpen ? styles.filterOptionsContainerShow : styles.filterOptionsContainer} >
                {children}
            </div>
        </div>
    )
}

export default FilterAccordion;
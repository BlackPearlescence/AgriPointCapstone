import styles from "./FilterSidebar.module.scss";

const FilterSidebar = ({ children, handleApplyFilters, handleResetFilters }) => {
    return (
        <div>
            {children}
            <div className={styles.filterButtonGroupContainer}>
                <button onClick={handleApplyFilters}>Apply Filters</button>
                <button onClick={handleResetFilters}>Reset Filters</button>
            </div>
        </div>
    )
}

export default FilterSidebar;
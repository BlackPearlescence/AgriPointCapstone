import { changePage, nextPage, prevPage } from "../../reducers/productSearchSlice";
import styles from "./PageNavigationBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
const PageNavigationBar = ({ totalPages, currentPage }) => {

    const dispatch = useDispatch();

    return (
        <div className={styles.pageBarContainer}>
            <button onClick={() => dispatch(prevPage())}>Back</button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => {
                if (page === currentPage) {
                    return <button key={page} className={styles.activePage} onClick={() => dispatch(changePage(page))}>{page}</button>
                } else {
                    return <button key={page} onClick={() => dispatch(changePage(page))}>{page}</button>
                }
            }
            )}
            <button onClick={() => dispatch(nextPage())}>Front</button>
        </div>
    )
}

export default PageNavigationBar;
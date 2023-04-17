import { useEffect, useState } from "react";
import { changePage, nextPage, prevPage } from "../../reducers/productSearchSlice";
import styles from "./PageNavigationBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
const PageNavigationBar = ({ totalPages, currentPage }) => {

    const dispatch = useDispatch();
    
    const [visiblePages, setVisiblePages] = useState([])
    const MAX_PAGES = 5; // The maximum number of pages to display at once
    const pageRangeStart = Math.max(1,currentPage - Math.floor(MAX_PAGES / 2));
    const pageRangeEnd = Math.min(totalPages, pageRangeStart + MAX_PAGES - 1);

    // This useEffect should update the visible pages when the current page changes.
    // If the current page is 4 then the visible pages should be [2,3,4,5,6]
    // If the current page is 6 then the visible pages should be [4,5,6,7,8]
    // If the current page is 8 then the visible pages should be [6,7,8,9,10]
    // If the current page is 10 then the visible pages should be [8,9,10,11,12]
    // 
    useEffect(() => {
        setVisiblePages([...Array(pageRangeEnd - pageRangeStart + 1)].map((_, i) => pageRangeStart + i))
    },[currentPage, totalPages])

    useEffect(() => {
        dispatch(changePage(1))
    },[])

    return (
        <div className={styles.pageBarContainer}>
            <button onClick={() => dispatch(prevPage())}>Back</button>
            {visiblePages.map((page) => {
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
import { useParams } from "react-router-dom";
import ProductViewLayout from "../components/productview/ProductViewLayout";
import styles from "./ProductViewPage.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductInfo, pickSize, selectProductInfo } from "../reducers/productViewSlice";


const ProductViewPage = () => {

    const { productId } = useParams();

    const dispatch = useDispatch()
    const productInfo = useSelector(selectProductInfo)

    useEffect(() => {
        dispatch(fetchProductInfo(productId))
    }, [productId])

     useEffect(() => {
        const findSize = productInfo.stock ? productInfo.stock.find(size => size.size_stock > 0) : null
        if (findSize) {
            dispatch(pickSize(findSize))
        } else {
            dispatch(pickSize("Out of Stock"))
        }
    }, [productInfo.stock])


  

    return(
        <div className={styles.productViewPageContainer}>
            <ProductViewLayout />
        </div>
    )
}

export default ProductViewPage;
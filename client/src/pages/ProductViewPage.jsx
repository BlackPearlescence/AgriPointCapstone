import { useParams } from "react-router-dom";
import ProductViewLayout from "../components/productview/ProductViewLayout";
import styles from "./ProductViewPage.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductInfo, pickSize, selectProductInfo } from "../reducers/productViewSlice";
import ProductReviewLayout from "../components/productview/ProductReviewLayout";
import ProductReviewCard from "../components/generalcards/ProductReviewCard";
import ProductReviewChartDisplay from "../components/productview/ProductReviewChartDisplay";
import { fetchProductReviews, selectProductReviews, showReviewModal } from "../reducers/productReviewSlice";


const ProductViewPage = () => {

    const { productId } = useParams();

    const dispatch = useDispatch()
    const productInfo = useSelector(selectProductInfo)
    const productReviews = useSelector(selectProductReviews)

    useEffect(() => {
        dispatch(fetchProductInfo(productId))
        dispatch(fetchProductReviews(productId))
        console.log(productReviews)
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
            <div className={styles.reviewSectionContainer}>
                <ProductReviewChartDisplay reviewStatistics={productReviews && productReviews.reviewStatistics} />
                <ProductReviewLayout>
                    {productReviews.reviews && productReviews.reviews.map(review => {
                        return <ProductReviewCard  review={review} />
                    })}
                </ProductReviewLayout>

            </div>
            
        </div>
    )
}

export default ProductViewPage;
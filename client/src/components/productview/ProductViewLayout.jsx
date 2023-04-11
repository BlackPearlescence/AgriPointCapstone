import styles from "./ProductViewLayout.module.scss";
import { GrCart, GrList } from "react-icons/gr"
import { BsFillCartPlusFill, BsList } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, pickSize, selectIsMaxAmount, selectIsMinAmount, selectProductInfo, selectSelectedQuantity, selectSelectedSize } from "../../reducers/productViewSlice";

const ProductViewLayout = ({ children }) => {

    const dispatch = useDispatch()
    const product = useSelector(selectProductInfo)
    const chosenSize = useSelector(selectSelectedSize)
    const currentQuantity = useSelector(selectSelectedQuantity)
    const isMin = useSelector(selectIsMinAmount)
    const isMax = useSelector(selectIsMaxAmount)
    return(
        <div className={styles.productViewWrapper}>
            <div className={styles.productTitleContainer}>
                <h1>{product.name}</h1>
            </div>
            <div>
                <h1>{product.type}</h1>
            </div>
            <div className={styles.productImageContainer}>
                <img src={product.image_url} alt="a product image" />
            </div>
            <div>
                <h1>Info + Nutrition</h1>
                {product.description}
            </div>
            <div>
                <h1>Tags</h1>
                {product.tags ? product.tags.map(tag => <span>{tag}</span>) : null}
                {/* <button>Add to Cart</button>
                <input type="text" />
                <button>Add to List</button> */}
            </div>
            <div>

            </div>
            <div className={styles.productCta}>
                <div className={styles.sizeContainer}>
                    <span>Sizes</span>
                    <div className={styles.sizeOptionsWrapper}>
                        {product.stock ? product.stock.map(stockItem => {
                            if(stockItem.size_stock === 0){
                                return <button disabled className={styles.outOfStock} onClick={() => dispatch(pickSize(stockItem))}>{stockItem.size_name}</button>
                            } else if(stockItem.size_name === chosenSize.size_name){
                                return <button className={styles.selectedSize} onClick={() => dispatch(pickSize(stockItem))}>{stockItem.size_name}</button>
                            } else {
                                return <button className={styles.normalSize} onClick={() => dispatch(pickSize(stockItem))}>{stockItem.size_name}</button>
                            }
                        }) : null}
                        {/* <button>6 ct</button>
                        <button>12 ct</button>
                        <button>24 ct</button>
                        <button>48 ct</button> */}
                    </div>
                </div>
                <div className={styles.qtyContainer}>
                    <span>Quantity</span>
                    <div className={styles.qtyBtnContainer}>
                        {isMin ? <button disabled className={styles.quantityThreshold} onClick={() => dispatch(decreaseQuantity())}>-</button> : <button className={styles.quantityBtn} onClick={() => dispatch(decreaseQuantity())}>-</button>}
                        <span>{currentQuantity}</span>
                        {isMax ? <button disabled className={styles.quantityThreshold} onClick={() => dispatch(increaseQuantity())}>+</button> : <button className={styles.quantityBtn} onClick={() => dispatch(increaseQuantity())}>+</button>}
                    </div>
                </div>
                <div className={styles.addBtnContainer}>
                    <button className={styles.cartBtn} ><BsFillCartPlusFill /> <span>Add to Cart</span></button>
                    <button className={styles.listBtn}><BsList /><span>Add to List</span></button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewLayout;
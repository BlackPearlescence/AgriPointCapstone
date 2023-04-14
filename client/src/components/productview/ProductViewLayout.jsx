import styles from "./ProductViewLayout.module.scss";
import { GrCart, GrList } from "react-icons/gr"
import { BsFillCartPlusFill, BsList } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, pickSize, selectIsMaxAmount, selectIsMinAmount, selectProductInfo, selectSelectedQuantity, selectSelectedSize } from "../../reducers/productViewSlice";
import { addToCart, getCart, showCart } from "../../reducers/cartSlice";
import { selectCustomerDetails } from "../../reducers/loginSlice";

const ProductViewLayout = ({ children }) => {

    const dispatch = useDispatch()
    const productInfo = useSelector(selectProductInfo)
    const chosenSize = useSelector(selectSelectedSize)
    const currentQuantity = useSelector(selectSelectedQuantity)
    const isMin = useSelector(selectIsMinAmount)
    const isMax = useSelector(selectIsMaxAmount)
    const customerDetails = useSelector(selectCustomerDetails)

    const handleAddProductToCart = () => {
        const size_name = chosenSize.size_name
        const size_item_count = chosenSize.size_item_count
        const quantity = currentQuantity
        const customer = customerDetails._id
        const product = productInfo._id
        const productChoice = { customer, product, size_name, size_item_count, quantity }
        dispatch(addToCart(productChoice))
    }

    return(
        <div className={styles.productViewWrapper}>
            <div className={styles.productTitleContainer}>
                <h1>{productInfo.name}</h1>
            </div>
            <div>
                <h1>{productInfo.type}</h1>
            </div>
            <div className={styles.productImageContainer}>
                <img src={productInfo.image_url} alt="a product image" />
            </div>
            <div>
                <h1>Info + Nutrition</h1>
                {productInfo.description}
            </div>
            <div>
                <h1>Tags</h1>
                {productInfo.tags ? productInfo.tags.map(tag => <span>{tag}</span>) : null}
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
                        {productInfo.stock ? productInfo.stock.map(stockItem => {
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
                    <button className={styles.cartBtn} onClick={handleAddProductToCart}><BsFillCartPlusFill /> <span>Add to Cart</span></button>
                    <button className={styles.listBtn}><BsList /><span>Add to List</span></button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewLayout;
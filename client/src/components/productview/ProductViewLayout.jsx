import styles from "./ProductViewLayout.module.scss";
import { GrCart, GrList } from "react-icons/gr"
import { BsFillCartPlusFill, BsList } from "react-icons/bs";

const ProductViewLayout = ({ children, product }) => {
    
    return(
        <div className={styles.productViewWrapper}>
            <div className={styles.productTitleContainer}>
                <h1>Some goddamn product</h1>
            </div>
            <div>
                <h1>Fourth of July Tomatoes</h1>
            </div>
            <div className={styles.productImageContainer}>
                <img src={require("../../images/tomatoes-g9a9044b45_1920.jpg")} alt="a product image" />
            </div>
            <div>
                <h1>Info + Nutrition</h1>
            </div>
            <div>
                <h1>Tags</h1>
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
                        <div>6 ct</div>
                        <div>12 ct</div>
                        <div>24 ct</div>
                        <div>48 ct</div>
                    </div>
                </div>
                <div className={styles.qtyContainer}>
                    <span>Quantity</span>
                    <div className={styles.qtyBtnContainer}>
                        <button>+</button>
                        <span>01</span>
                        <button>-</button>
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
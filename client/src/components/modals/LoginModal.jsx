import styles from "./LoginModal.module.scss";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginShown } from "../../reducers/loginSlice";
import { showLogin, hideLogin, switchToRegister } from "../../reducers/loginSlice";

const LoginModal = () => {

    const dispatch = useDispatch()
    const loginShownState = useSelector(selectLoginShown)

    return (
        <Modal centered size="md" show={loginShownState} onShow={() => dispatch(showLogin())} onHide={() => dispatch(hideLogin())}>
            <div className={styles.loginModalContainer}>
                <div className={styles.loginHeader}>Log into your Account</div>
                <form className={styles.loginFormContainer}>
                    <div className={styles.loginField}>   
                        <span>Email Address</span>
                        <span>Password</span>
                    </div>
                    <div className={styles.loginField}>
                        <input type="text" />
                        <input type="password" />
                    </div>
                </form>
                
                <button className={styles.loginBtn}>Log in</button>
                {/* <button>Log in with Google</button> */}
                <a href="#" className={styles.switchToRegisterLink} onClick={() => dispatch(switchToRegister())}>Don't have an account? Register here. </a>
            </div>
        </Modal>
    )
}

export default LoginModal;
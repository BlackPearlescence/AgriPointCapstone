import styles from "./LoginModal.module.scss";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginShown } from "../../reducers/login/loginSlice";
import { showLogin, hideLogin, switchToRegister } from "../../reducers/login/loginSlice";

const LoginModal = () => {

    const dispatch = useDispatch()
    const loginShownState = useSelector(selectLoginShown)

    return (
        <Modal centered size="md" show={loginShownState} onShow={() => dispatch(showLogin())} onHide={() => dispatch(hideLogin())}>
            <div className={styles.modalContainer}>
                <span>Log into your Account</span>
                <div>
                    <span>Email Address or Username</span>
                    <input type="text" />
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" />
                </div>
                <button>Log in</button>
                <button>Log in with Google</button>
                <a href="#" onClick={() => dispatch(switchToRegister())}>Don't have an account? Register here. </a>
            </div>
        </Modal>
    )
}

export default LoginModal;
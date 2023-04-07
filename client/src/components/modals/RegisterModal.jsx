import styles from "./RegisterModal.module.scss"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { hideRegister, selectRegisterShown, showRegister, switchToLogin } from "../../reducers/loginSlice";


const RegisterModal = () => {

    const dispatch = useDispatch();
    const registerShownState = useSelector(selectRegisterShown)

    return (
        <Modal centered size="md" show={registerShownState} onShow={() => dispatch(showRegister())} onHide={() => dispatch(hideRegister())}>
            <div className={styles.modalContainer}>
                <span>Create an Account</span>
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
                <a href="#" onClick={() => dispatch(switchToLogin())}>Already have an account? Login here. </a>
            </div>
        </Modal>
    )
}

export default RegisterModal;
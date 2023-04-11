import styles from "./RegisterModal.module.scss"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { hideRegister, selectRegisterShown, showRegister, switchToLogin } from "../../reducers/loginSlice";


const RegisterModal = () => {

    const dispatch = useDispatch();
    const registerShownState = useSelector(selectRegisterShown)

    return (
        <Modal centered size="md" show={registerShownState} onShow={() => dispatch(showRegister())} onHide={() => dispatch(hideRegister())}>
            <div className={styles.registerModalContainer}>
                <div className={styles.registerHeader}>Create an Account</div>
                <form className={styles.registerFormContainer }>
                    <div className={styles.fieldLabelContainer}>
                        <span>Email Address</span>
                        <span>Password</span>
                        <span>Confirm Password</span>
                    </div>
                    <div className={styles.fieldContainer}>
                        <input type="text" />
                        <input type="password" />
                        <input type="password" />
                    </div>
                </form>
                <button className={styles.registerBtn}>Register</button>
                <a href="#" className={styles.switchToLoginLink} onClick={() => dispatch(switchToLogin())}>Already have an account? Login here. </a>
            </div>
        </Modal>
    )
}

export default RegisterModal;
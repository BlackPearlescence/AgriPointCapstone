import styles from "./RegisterModal.module.scss"
import { Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { hideErrors, hideRegister, makeRegistrationRequest, selectRegisterShown, showRegister, switchToLogin } from "../../reducers/loginSlice";
import { useState } from "react";


const RegisterModal = () => {

    const dispatch = useDispatch();
    const registerShownState = useSelector(selectRegisterShown)
    const [ registerForm, setRegisterForm ] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    const [ registerChecks, setRegisterChecks ] = useState({
        hasAgreedToTerms: false,
        hasAgreedToNewsletter: false
    })

    const handleRegisterChecksChange = (e) => {
        dispatch(hideErrors())
        setRegisterChecks({
            ...registerChecks,
            [e.target.name]: e.target.checked
        })
    }

    const handleRegisterFormChange = (e) => {
        dispatch(hideErrors())
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    const handleRegisterFormSubmit = (e) => {
        e.preventDefault();
        dispatch(makeRegistrationRequest(registerForm))
    }

    return (
        <Modal centered size="md" show={registerShownState} onShow={() => dispatch(showRegister())} onHide={() => dispatch(hideRegister())}>
            <div className={styles.registerModalContainer}>
                <div className={styles.registerHeader}>Create an Account</div>
                <form className={styles.registerFormContainer} onSubmit={handleRegisterFormSubmit}>
                    <div className={styles.registerFormControlsContainer}>
                        <div className={styles.fieldLabelContainer}>
                            <span>First Name</span>
                            <span>Last Name</span>
                            <span>Email Address</span>
                            <span>Password</span>
                            <span>Confirm Password</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <input name="first_name" type="text" value={registerForm.firstName} onChange={handleRegisterFormChange} />
                            <input name="last_name" type="text" value={registerForm.lastName} onChange={handleRegisterFormChange} />
                            <input name="username" type="text" value={registerForm.email} onChange={handleRegisterFormChange} />
                            <input name="password" type="password" value={registerForm.password} onChange={handleRegisterFormChange} />
                            <input name="confirmPassword" type="password" value={registerForm.confirmPassword} onChange={handleRegisterFormChange} />
                        </div>
                    </div>
                    <div className={styles.checkBoxContainer}>
                        <div className={styles.checkBox}>
                            <input checked={registerChecks.hasAgreedToTerms} onChange={handleRegisterChecksChange} type="checkbox" name="hasAgreedToTerms" id="terms" />
                            <label htmlFor="terms">I agree to the terms and conditions</label>
                        </div>
                        <div className={styles.checkBox}>
                            <input checked={registerChecks.hasAgreedToNewsletter} onChange={handleRegisterChecksChange} type="checkbox" name="hasAgreedToNewsletter" id="newsletter" />
                            <label htmlFor="newsletter">I would like to receive the newsletter</label>
                        </div>
                    </div>
                    <button type="submit" className={styles.registerBtn}>Register</button>
                </form>
                <a href="#" className={styles.switchToLoginLink} onClick={() => dispatch(switchToLogin())}>Already have an account? Login here. </a>
            </div>
        </Modal>
    )
}

export default RegisterModal;
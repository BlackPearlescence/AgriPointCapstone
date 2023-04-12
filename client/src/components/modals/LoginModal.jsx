import styles from "./LoginModal.module.scss";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideErrors, makeLoginRequest, selectLoginError, selectLoginShown } from "../../reducers/loginSlice";
import { showLogin, hideLogin, switchToRegister } from "../../reducers/loginSlice";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import { AlertTitle } from "@mui/material";


const LoginModal = () => {

    const dispatch = useDispatch()
    const loginShownState = useSelector(selectLoginShown)
    const errorState = useSelector(selectLoginError)

    // Username is email
    const [ loginForm, setLoginForm ] = useState({
        username: "",
        password: ""
    })

    const handleLoginFormChange = (e) => {
        dispatch(hideErrors())
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })

        console.log(loginForm)
    }

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        dispatch(makeLoginRequest(loginForm))
    }

    return (
        <Modal centered size="md" show={loginShownState} onShow={() => dispatch(showLogin())} onHide={() => dispatch(hideLogin())}>
            <div className={styles.loginModalContainer}>
                <div className={styles.loginHeader}>Log into your Account</div>
                {errorState ?  
                <Alert severity="error" sx={{ width: "100%", fontSize: 15, fontWeight: 600}}>
                    <AlertTitle sx={{ fontSize: 20, fontWeight: 600 }}>Failure to Log In</AlertTitle>
                    {errorState}
                </Alert> : null}
               
                <form className={styles.loginFormContainer} onSubmit={handleLoginFormSubmit}>
                    <div className={styles.loginFormControlsContainer}>
                        <div className={styles.loginField}>   
                            <span>Email Address</span>
                            <span>Password</span>
                        </div>
                        <div className={styles.loginField}>
                            <input name="username" type="text"  value={loginForm.username} onChange={handleLoginFormChange} />
                            <input name="password" type="password" value={loginForm.password} onChange={handleLoginFormChange} />
                        </div>
                    </div>
                    <button type="submit" className={styles.loginBtn}>Log in</button>
                </form>
                
        
                {/* <button>Log in with Google</button> */}
                <a href="#" className={styles.switchToRegisterLink} onClick={() => dispatch(switchToRegister())}>Don't have an account? Register here. </a>
            </div>
        </Modal>
    )
}

export default LoginModal;
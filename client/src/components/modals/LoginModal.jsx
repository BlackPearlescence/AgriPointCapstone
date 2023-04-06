import styles from "./LoginModal.module.scss";
import { Modal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { selectShown } from "../../reducers/login/loginModalSlice";

const LoginModal = () => {

    const dispatch = useDispatch()
    const showState = useSelector(selectShown)

    return (
        <Modal open={showState}>
            <div className={styles.modalContainer}>
                <span>Log into your Account</span>
            </div>
        </Modal>
    )
}

export default LoginModal;
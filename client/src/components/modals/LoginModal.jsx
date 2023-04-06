import styles from "./LoginModal.module.scss";
import { Modal } from "semantic-ui-react";

const LoginModal = () => {

    return (
        <Modal>
            <div className={styles.modalContainer}>
                <span>Log into your Account</span>
            </div>
        </Modal>
    )
}

export default LoginModal;
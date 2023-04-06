import styles from "./LoginModal.module.scss";
import { Modal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { selectShown } from "../../reducers/login/loginModalSlice";
import { showModal, hideModal } from "../../reducers/login/loginModalSlice";

const LoginModal = () => {

    const dispatch = useDispatch()
    const showState = useSelector(selectShown)

    return (
        <Modal size="mini" open={showState} onOpen={() => dispatch(showModal())} onClose={() => dispatch(hideModal())}>
            <div className={styles.modalContainer}>
                <span>Log into your Account</span>
                <div>
                    <span>Blah</span>
                    <input type="text" />
                </div>
                <div>
                    <span>Blah</span>
                    <input type="text" />
                </div>
                <button>Log in</button>
                <button>Log in with Google</button>
            </div>
        </Modal>
    )
}

export default LoginModal;
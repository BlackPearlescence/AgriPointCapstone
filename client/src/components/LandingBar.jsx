import styles from "./LandingBar.module.scss"

const LandingBar = () => {

    return(
        <div className={styles.landingBarContainer}>
            <div className={styles.brandContainer}>
                <img className={styles.brandLogo} src={require("../images/IconOnly_Transparent_NoBuffer.png")} />
                <img className={styles.brandTextLogo} src={require("../images/FullLogo_Transparent_NoBuffer (2).png")} />
            </div>
            <button className={styles.loginBtn}>Log In</button>
        </div>
    )
}

export default LandingBar;
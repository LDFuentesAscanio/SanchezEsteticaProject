import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"

function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.message}>¡Oops! La página que buscas no existe</p>
            <Link to="/" className={styles.homeLink}>Volver a la página de inicio</Link>
        </div>
    );
}

export default NotFound
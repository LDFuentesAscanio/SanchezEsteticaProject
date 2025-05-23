import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { UsersContext } from '../../Context/UsersContext';

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation();
    const { logoutUser } = useContext(UsersContext); 

    const handleLogOut = async () => {
        logoutUser();
        await Swal.fire({
            icon: 'warning',
            title: 'tu sesion fue cerrada correctamente',
        })
        navigate("/login")
    }

    return (
        <nav className={styles.nav}>
            <img 
                src={logo} 
                alt="Logo" 
                className={styles.logo}
            />
            <ul className={styles.navLinks}>
                <li>
                    <Link 
                        to="/" 
                        className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/myappointments" 
                        className={`${styles.navLink} ${location.pathname === "/myappointments" ? styles.active : ""}`}
                    >
                        Mis Citas
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/schedule" 
                        className={`${styles.navLink} ${location.pathname === "/schedule" ? styles.active : ""}`}
                    >
                        Agendar Cita
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/login" 
                        className={`${styles.navLink}`}
                        onClick={ handleLogOut }
                    >
                        Cerrar sesión
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

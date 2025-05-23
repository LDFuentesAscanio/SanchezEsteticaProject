import { useState, useEffect } from "react";
import Styles from "./Home.module.css";
import rojo from "../../assets/rojo.png";
import azul from "../../assets/azul.png";
import acua from "../../assets/acua.png";


function Home() {
    const images = [rojo, azul, acua];
    const [currentIndex, setCurrentIndex] = useState(0);

    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval); 
    }, [images.length]);

    return (
        <div className={Styles.home}>
            <header className={Styles.header}>
                    <h1>Citas Sánchez Estética</h1>
                </header>
                <div className={Styles.aboutSection}>
                    <div className={Styles.carousel}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`${Styles.carouselItem} ${
                                    index === currentIndex ? Styles.active : ""
                                }`}
                            >
                                <img
                                    src={image}
                                    alt={`Imagen ${index}`}
                                    className={Styles.carouselImage}
                                />
                            </div>
                        ))}
                    </div>
                    <section className={Styles.about}>
                        <h2>Acerca de Sánchez Estética</h2>
                        <p>
                            Especialistas en medicina estética en Argentina. Ofrecemos tratamientos modernos y personalizados para resaltar tu belleza natural.
                        </p>
                    </section>
                </div>
                <section className={Styles.treatments}>
                    <h2>Tratamientos Destacados</h2>
                    <div className={Styles.treatment}>
                        <img src="https://www.clinicasdermalia.com/wp-content/uploads/2024/06/rejuvenecimiento-facial-lifting.jpg" alt="Rejuvenecimiento Facial" className={Styles.treatmentImage} />
                        <div>
                            <h3>Rejuvenecimiento Facial</h3>
                            <p>Tratamiento para revitalizar y rejuvenecer la piel, reduciendo arrugas y signos de envejecimiento.</p>
                        </div>
                    </div>
                    <div className={Styles.treatment}>
                        <img src="https://shawellness.com/shamagazine/wp-content/uploads/2016/03/beneficios-de-la-toxina-butolitica-849x450.jpg" alt="Aplicación de Toxina Botulínica" className={Styles.treatmentImage} />
                        <div>
                            <h3>Aplicación de Toxina Botulínica</h3>
                            <p>Elimina líneas de expresión y arrugas, devolviendo una apariencia fresca y relajada.</p>
                        </div>
                    </div>
                    <div className={Styles.treatment}>
                        <img src="https://refinepharma.es/wp-content/uploads/2023/07/medical-procedure-with-hyaluronic-acid-2021-08-26-16-53-43-utc-scaled-scaled.jpg" alt="Rellenos Dermales" className={Styles.treatmentImage} />
                        <div>
                            <h3>Rellenos Dermales</h3>
                            <p>Corrige imperfecciones, restaura volumen y define contornos faciales para un aspecto natural.</p>
                        </div>
                    </div>
                    <p>¿Te interesan nuestros tratamientos personalizados para resaltar tu belleza natural? <a href="/schedule" className={Styles.scheduleLink}>Reserva una cita</a></p>
                </section>
                <section className={Styles.schedule}>
                    <h2>Horarios de Atención</h2>
                    <ul>
                        <li>Lunes a Viernes: 8:00 AM - 6:00 PM</li>
                    </ul>
                </section>

                <footer className={Styles.footer}>
                    <p>&copy; 2025 Sánchez Estética. Todos los derechos reservados.</p>
                    <div className={Styles.socials}>
                        <a href="#" className={Styles.socialIcon}>Facebook</a>
                        <a href="#" className={Styles.socialIcon}>Instagram</a>
                        <a href="#" className={Styles.socialIcon}>Twitter</a>
                    </div>
                </footer>
        </div>
    );
}

export default Home;
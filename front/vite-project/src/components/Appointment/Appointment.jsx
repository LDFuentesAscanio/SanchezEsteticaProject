/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { UsersContext } from "../../Context/UsersContext";
import Swal from "sweetalert2";
import Styles from "./Appointment.module.css";
import florappoint from "../../assets/florappoint.png";

function showAlert(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        width: '400px',
        color: '##F5F5DC', 
        background: '#F5F5DC', 
        iconColor: '#3C8C91', 
        confirmButtonColor: '#3C8C91', 
    });
  }

const Appointment = ({ id, date, time, status, index}) => {
    const { cancelUserAppointment } = useContext(UsersContext);
    const [currentStatus, setCurrentStatus] = useState(status);
        
    const isCancelable = () => {    

    const [year, month, dayHour] = date.split("-");
    const day = dayHour.split("T")[0].split("-")[0];
    
    const [appHour, appMinute] = time.split(":");

    const appointmentDate = new Date(
        parseInt(year),
        parseInt(month) - 1, 
        parseInt(day),
        parseInt(appHour),
        parseInt(appMinute)
    );


    const nowLocal = new Date();
    const diffMinutes = Math.abs((appointmentDate - nowLocal) / (1000 * 60));

    if (diffMinutes <= 1440) {
        return false;
    } else {
        return true
    } 
}

    const handleOnClick = async () => {

        if (!isCancelable()) {
            showAlert('warning', 'No se puede cancelar', 'No se puede cancelar la reserva dentro de las 24 horas anteriores la cita.');
            return; 
        }
        try {   
            await cancelUserAppointment(id);
            showAlert('success', 'Reserva cancelada', 'Tu reserva se canceló con éxito');
            setCurrentStatus("Cancelled");
        } catch (error) {
            console.error("Error al cancelar la cita:", error);
        }
    };

    const [dateSplit, timeFormat] = date.split("T");
    const dateFormat = dateSplit.split("-").reverse().join("/");

    return (
        <div>

            <div className={Styles.container}>

                <img src={florappoint} alt="Cita" className={Styles.cardImage}/>
                <div className={`${Styles.card} ${currentStatus === "Cancelled" ? Styles.disabledCard : ''}`}>
                    <div>
                        <h4 className={Styles.title}>Reserva: {index}</h4>
                        <hr className={Styles.line}/>
                    </div>
                    
                    <div className={Styles.cardInfo}>
                        
                        <h4>Hora: {time}</h4>
                        <h4>Fecha: {dateFormat}</h4>
                        
                        <h4 className={Styles[currentStatus.toLowerCase()]}>
                            {currentStatus === "Cancelled" ? "CANCELADA" : "ACTIVA"}
                        </h4>
                        <div className={Styles.buttonContainter}>
                            <button
                                onClick={handleOnClick}
                                disabled={currentStatus === "Cancelled"}
                                className={Styles.button}
                                >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;

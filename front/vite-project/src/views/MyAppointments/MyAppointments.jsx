/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import Appointment from "../../components/Appointment/Appointment"
import Styles from "./MyAppointments.module.css"
import { UsersContext } from "../../Context/UsersContext"

function MyAppointments () {

    const { userAppointments, getUserAppointments, user } = useContext(UsersContext)

    useEffect(() => {
        try {
            getUserAppointments(user);
        } catch (error) {
            console.error("Hubo un error al obtener las citas:", error);
        }}, [user]);

    return (
        <div className={Styles.container}>
            <h1 className={Styles.header}>Mis Citas</h1>
            <div className={Styles.cardGrid}>
                { Array.isArray(userAppointments) && userAppointments.length > 0 ? userAppointments.map(appointment => {
                    return (
                        <Appointment 
                        key={appointment.id}
                        id={appointment.id}
                        date={appointment.date}
                        time={appointment.time}
                        status={appointment.status}
                        />
                    )
                }) : <h2 className={Styles.noAppointments}>No hay citas para mostar</h2>}
            </div>
        </div>
    )
}

export default MyAppointments
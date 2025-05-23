import { useContext, useEffect, useState } from "react";
import { UsersContext } from "./../../Context/UsersContext";
import Swal from "sweetalert2";
import Styles from "./Schedule.module.css";
import { useNavigate } from "react-router-dom";
import clipse from "../../assets/clipse.mp4";
import { scheduleFormValidates } from "../../helpers/scheduleFormValidates";

function showAlert(icon, title, text) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    width: "400px",
    color: "##F5F5DC",
    background: "#F5F5DC",
    iconColor: "#D66466",
    confirmButtonColor: "#D66466",
  });
}

const Schedule = () => {
  const { scheduleAppointment, user } = useContext(UsersContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    time: "",
    userId: user?.id || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      userId: user,
    }));
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = scheduleFormValidates(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await scheduleAppointment(form);
      showAlert("success", "Cita agendada con éxito", "Tu cita ha sido gestionada con éxito.");
      navigate("/myappointments");
    } catch (error) {
      if (error.response) {
        const { message, data } = error.response.data;
        showAlert("error", message, data);
      } else {
        console.error("Error desconocido:", error);
        showAlert("error", "Error desconocido", "Ocurrió un error inesperado al realizar la reserva.");
      }
    }
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.videoContainer}>
        <video className={Styles.video} autoPlay muted loop playsInline>
          <source src={clipse} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      </div>
      <div className={Styles.formContainer}>
        <h1 className={Styles.title}>Agendar Cita</h1>
        <form onSubmit={handleOnSubmit} className={Styles.form}>
          <div>
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              name="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.date}
              onChange={handleInputChange}
              className={Styles.input}
            />
            {errors.date && <p className={Styles.error}>{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="time">Hora</label>
            <input
              type="time"
              name="time"
              id="time"
              value={form.time}
              onChange={handleInputChange}
              className={Styles.input}
            />
            {errors.time && <p className={Styles.error}>{errors.time}</p>}
          </div>

          <button
            type="submit"
            className={Styles.submitButton}
            disabled={!form.date || !form.time}
          >
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Schedule;

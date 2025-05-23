import moment from "moment";

export const scheduleFormValidates = (form) => {
  const errors = {};

  // Validar fecha vacía
  if (!form.date.trim()) {
    errors.date = "La fecha es requerida.";
  } else {
    const appointmentDateTime = moment(`${form.date} ${form.time}`, "YYYY-MM-DD HH:mm");
    const now = moment();

    // Validar que la fecha no sea pasada
    if (appointmentDateTime.isBefore(now)) {
      errors.date = "No se pueden agendar citas en fechas pasadas.";
    }

    // Validar que haya al menos 24 horas de antelación
    const diffInHours = appointmentDateTime.diff(now, "hours");
    if (diffInHours < 24) {
      errors.date = "No se pueden agendar citas con menos de 24 horas de antelación.";
    }

    // Validar que no sea fin de semana
    const dayOfWeek = appointmentDateTime.day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      errors.date = "No se pueden agendar citas los fines de semana.";
    }

    // Validar horario permitido
    const hour = appointmentDateTime.hour();
    const minute = appointmentDateTime.minute();
    if (hour < 8 || (hour === 18 && minute > 0) || hour > 18) {
      errors.time = "No se pueden agendar citas fuera del horario de 8:00 a 18:00.";
    }
  }

  // Validar hora vacía
  if (!form.time.trim()) {
    errors.time = "La hora es requerida.";
  }

  return errors;
};

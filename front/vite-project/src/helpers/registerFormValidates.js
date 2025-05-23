export const registerFormValidates = (input) => {
    const errors = {};

    if (!input.name.trim()) {
        errors.name = "El nombre es requerido";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(input.name.trim())) {
        errors.name = "El nombre debe incluir al menos un nombre y un apellido";
    }

    if (!input.email.trim()) {
        errors.email = "El email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(input.email.trim())) {
        errors.email = "El email debe ser válido";
    }

    if (!input.birthdate.trim()) {
        errors.birthdate = "La fecha de nacimiento es requerida";
    } else {
        const birthDate = new Date(input.birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (birthDate > today) {
            errors.birthdate = "La fecha de nacimiento no puede ser en el futuro";
        } else if (age < 18 || (age === 18 && monthDifference < 0)) {
            errors.birthdate = "Debe ser mayor de edad para registrarse";
        }
    }

    if (!input.nDni.trim()) {
        errors.nDni = "El número de DNI es requerido";
    } else if (!/^\d+$/.test(input.nDni.trim())) {
        errors.nDni = "El número de DNI solo debe contener números";
    } else if (input.nDni.trim().length < 7 || input.nDni.trim().length > 8) {
        errors.nDni = "El número de DNI debe tener entre 7 y 8 dígitos";
    }

    if (!input.password.trim()) {
        errors.password = "La contraseña es requerida";
    } else if (input.password.length < 5 || input.password.length > 12) {
        errors.password = "La contraseña debe tener entre 5 y 12 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.,?])/g.test(input.password)) {
        errors.password = "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un carácter especial";
    }

    return errors;
};

export const loginFormValidates = (input) => {
    const errors = {};

    if (!input.username.trim()) {
        errors.username = "El nombre de usuario es requerido";
    }

    if (!input.password.trim()) {
        errors.password = "La contraseña es requerida";
    }
    return errors;
}
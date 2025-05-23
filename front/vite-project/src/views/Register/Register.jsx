import { registerFormValidates } from "../../helpers/registerFormValidates";
import Styles from "./Register.module.css";
import { useFormik } from "formik";
import InputField from "../../components/InputField/InputField";
import Swal from "sweetalert2";
import flowers from "../../assets/flowers.mp4";
import tagrojo from "../../assets/tagrojo.png";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../Context/UsersContext";

const Register = () => {
   const { registerUser } = useContext(UsersContext)
   const navigate = useNavigate()

  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    validate: registerFormValidates,
    initialErrors: {
      name: "Nombre es requerido",
      email: "Email es requerido",
      birthdate: "Fecha de nacimiento es requerida",
      nDni: "Número de DNI es requerido",
      username: "El nombre de Usuario es requerido",
      password: "La Contraseña es requerida",
      confirmPassword: "La contraseña no coincide",
    },
    initialTouched: {
        name: true,
        email: true,
        date: true,
        dni: true,
        username: true,
        password: true,
        confirmPassword: true,
      },
    onSubmit: (values) => {
        const payload = {
            name: values.name,
            email: values.email,
            birthdate: values.birthdate, 
            nDni: values.nDni,       
            username: values.username,
            password: values.password,
        };
        registerUser(payload)
         .then((res) => {
            if(res.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: '¡Gracias por registrarte en Citas Sanchez Estética!',
                    confirmButtonText: 'Aceptar',
                })
                formik.resetForm()
                navigate("/login");
            }
        })
        .catch((err) => {
            const message = err?.response?.data?.message; 
        
            if (typeof message === "string") {
                if (message.includes("correo")) {
                    Swal.fire({
                        icon: 'error',
                        title: `Ya existe un usuario con el correo: ${formik.values.email}`,
                        text: 'Por favor, cambia el correo y vuelve a intentarlo',
                    });
                } else if (message.includes("nombre de usuario")) {
                    Swal.fire({
                        icon: 'error',
                        title: `Ya existe un usuario con el nombre de usuario: ${formik.values.username}`,
                        text: 'Por favor, cambia el nombre de usuario y vuelve a intentarlo',
                    });
                } else if (message.includes("DNI")) {
                    Swal.fire({
                        icon: 'error',
                        title: `Ya existe un usuario con el DNI: ${formik.values.nDni}`,
                        text: 'Verifica si ya estás registrado o cámbialo y vuelve a intentarlo',
                    });
                }
            } else {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error inesperado',
                    text: 'Ocurrió un error al registrar el usuario. Intenta nuevamente más tarde.',
                });
                console.error(err); 
            }
        });
    }
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={Styles.pageContainer}>
        <video className={Styles.backgroundVideo}
        autoPlay
        muted
        loop
        playsInline>
            <source
                src={flowers}
                type="video/mp4"
            />
            Tu navegador no soporta videos HTML5.
        </video>
        <img src={tagrojo} alt="Logo" className={Styles.logo} />
        <h2>Formulario de Registro</h2>
        <form className={Styles.formContainer} onSubmit={formik.handleSubmit}>
        <InputField
            name="name"
            placeholder="Nombre"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={formik.handleChange}
        />
        <InputField
            name="email"
            placeholder="Email"
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange}
        />
        <InputField
            type="date"
            name="birthdate"
            placeholder="Fecha de nacimiento"
            value={formik.values.birthdate}
            error={formik.errors.birthdate}
            onChange={formik.handleChange}
        />
        <InputField
            type="text"
            name="nDni"
            placeholder="Número de DNI"
            value={formik.values.nDni}
            error={formik.errors.nDni}
            onChange={formik.handleChange}
        />
        <InputField
            name="username"
            placeholder="Nombre de usuario"
            value={formik.values.username}
            error={formik.errors.username}
            onChange={formik.handleChange}
        />
        <div className={Styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <div className={Styles.passwordContainer}>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"} // Alterna entre 'password' y 'text'
              name="password"
              placeholder="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <span
              className={Styles.passwordToggle}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {formik.errors.password && (
            <span className={Styles.error}>{formik.errors.password}</span>
          )}
        </div>
        <div className={Styles.buttonContainer}>
            <button
                className={Styles.submitButton}
                type="submit"
                disabled={
                formik.errors.name ||
                formik.errors.email ||
                formik.errors.birthdate ||
                formik.errors.nDni ||
                formik.errors.username ||
                formik.errors.password
                }
            >
                Enviar
            </button>
        </div>
        <br />
            <label>
              ¿Ya tienes una cuenta? <Link to="/login" className={Styles.loginLink}>Inicia sesión</Link>
            </label>
        </form>
    </div>
  );
};

export default Register;

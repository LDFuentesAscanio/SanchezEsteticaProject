import Styles from "./Login.module.css";
import { loginFormValidates } from "../../helpers/loginFormValidates";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import flowers from "../../assets/flowers.mp4";
import tagrojo from "../../assets/tagrojo.png";
import InputField from "../../components/InputField/InputField";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../Context/UsersContext";


const Login = () => {
  const { loginUser } = useContext(UsersContext)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginFormValidates,
    initialErrors: {
      username: "Usuario es requerido",
      password: "Contraseña es requerida",
    },
    initialTouched: {
      username: true,
      password: true
    },
    onSubmit: (values, { resetForm }) => {
      const payload = {
        username: values.username,
        password: values.password,
      };

      loginUser(payload)
        .then((res) => {
            if(res.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: '¡Sesión iniciada!',
                    text: 'Estas en Citas Sánchez Estética'
                });
                localStorage.setItem("userId", res.data.user.id);
                navigate("/")
                resetForm();
            }
        })
        .catch((error) => {
          console.error(error);
          if (error.response?.status === 400) {
            Swal.fire({
              icon: "error",
              title: `${error.response.data.data}`,
              text: "Intente nuevamente",
            });
          } else if (error.response?.data?.message) {
            Swal.fire({
              icon: "error",
              title: `${error.response.data.details}`,
              text: "Ocurrió un problema, intente nuevamente",
            });
          }
      });
      
    },
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
      <h2>Acceso</h2>
      <form className={Styles.formContainer} onSubmit={formik.handleSubmit}>
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
                      type={passwordVisible ? "text" : "password"} 
                      name="password"
                      placeholder="Contraseña"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <span
                      className={Styles.passwordToggle}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye/>}
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
              formik.errors.username ||
              formik.errors.password
            }
          >Iniciar sesión
          </button>
        </div>
          <br />
            <label>
              ¿Aún no has creado una cuenta? <Link to="/register" className={Styles.registerLink}>Regístrate</Link>
            </label>
      </form>
    </div>

            
  );
};

export default Login;
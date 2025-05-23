import { useContext, useEffect, useState } from 'react';
import './App.module.css';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import MyAppointments from './views/MyAppointments/MyAppointments';
import Register from './views/Register/Register';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import { UsersContext } from './Context/UsersContext';
import Schedule from './views/Schedule/Schedule';


function App() {
  
  const { isLogged } = useContext(UsersContext)
  const [isNotFound, setIsNotFound] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const validateRoutes = ["/", "/login", "/register", "/myappointments", "/schedule"];
    
    if (!validateRoutes.includes(location.pathname)) setIsNotFound(true);
    else setIsNotFound(false);

    if (!isLogged && location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
    } else if (isLogged && (location.pathname === "/login" || location.pathname === "/register")) {
        navigate("/");
    }

}, [isLogged, navigate, location.pathname]);

  return (
    <>
      {
        !isLogged ? (
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
        ) : (
          <>
            {
              !isNotFound && (
                <header>
                  <Navbar />
                </header>            
              )
            }
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/myappointments" element={<MyAppointments />}/>
              <Route path="/schedule" element={<Schedule />}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </>
        )
      } 
    </>
  )
}

export default App

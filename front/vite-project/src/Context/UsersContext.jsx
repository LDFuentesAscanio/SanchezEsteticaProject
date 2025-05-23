import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const UsersContext = createContext({
    user: null,
    isLogged: false,
    userAppointments: [],
    registerUser: async () => {},
    loginUser: async () => {},
    logoutUser: () => {},
    getUserAppointments: async () => {},
    scheduleAppointment: async () => {},
    addAppointment: () => {},
    cancelUserAppointment: async () => {},
});

// eslint-disable-next-line react/prop-types
export const UsersProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") ?? null);
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));
    const [userAppointments, setUserAppointments] = useState([]);

    
   useEffect(() => {
    setIsLogged(!!user);
  }, [user]);


    const registerUser = async (userData) => {
        return await axios.post("http://localhost:3000/users/register", userData);
    };

    const loginUser = async (LoginUser) => {
        const res = await axios.post("http://localhost:3000/users/login", LoginUser);
        localStorage.setItem("user", res.data.user.id);
        setUser(res.data.user.id);
        return res;
    };

    const logoutUser = () => {
        localStorage.removeItem("user");
        setUser(null);
        setUserAppointments([]); 
    };

    const getUserAppointments = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            setUserAppointments(response.data.data.appointments);
        } catch (error) {
            console.error("Error al obtener las citas:", error);
        }
    };

    const scheduleAppointment = async (appointmentData) => {
        await axios.post("http://localhost:3000/appointments/schedule", appointmentData);
    };

    const addAppointment = (newAppointment) =>{
        setUserAppointments((prevAppointments) =>[...prevAppointments, newAppointment]);
    }

    const cancelUserAppointment = async (appointmentId) => {
        try {
            await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
            const newAppointments = userAppointments.map((appointment) =>
                appointment.id === appointmentId ? { ...appointment, status: "cancelled" } : appointment)
                setUserAppointments(newAppointments);
        } catch (error) {
            console.error("Error al cancelar la cita:", error);
        }
    };
    
    const value = {
        user,
        isLogged,
        userAppointments,
        loginUser,
        logoutUser,
        registerUser,
        scheduleAppointment,
        getUserAppointments,
        addAppointment,
        cancelUserAppointment,
    };

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    );
};

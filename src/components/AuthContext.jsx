
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

function checkAuthinLocalStorage() {
    return "auth" in localStorage ? true : false
}

function checkUserType() {
    if (checkAuthinLocalStorage()) {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const user_type = auth.user_type
        return user_type
    } else {
        return ""
    }
    
}


export function AuthProvider({ children }){
    

    const [isAuthenticated, setAuthenticated] = useState(checkAuthinLocalStorage());
    const [userType, setUserType] = useState(checkUserType());

    const login = (data) => {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuthenticated(true);
    }
    const logout = () => {
        localStorage.removeItem("auth");
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated: isAuthenticated, login: login, logout: logout, userType: userType}}>
            {children}
        </AuthContext.Provider>
    )
}

export default function AuthConsumer() {
    return useContext(AuthContext); 
}


// import { createContext } from "react"

// const AuthContext = createContext();

// export const AuthProvider = AuthContext.Provider;
// export const AuthConsumer = AuthContext.Consumer;
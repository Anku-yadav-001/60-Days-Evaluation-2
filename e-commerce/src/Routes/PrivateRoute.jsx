import { useContext } from "react";
import { AuthContext } from "../Context/ContextAPI";
import { Navigate } from "react-router-dom";

export function PrivateRoute({children}){
        let {user}=useContext(AuthContext)
        return user.isAuthenticated?children:<Navigate to="/login"/>
}
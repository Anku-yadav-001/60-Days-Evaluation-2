import { createContext, useState } from "react";

export let AuthContext=createContext()
export function ContextAPI({children}){
    let [user,setUser]=useState({ isAuthenticated: false, token: null, email: null })
    return <>
     <AuthContext.Provider value={{user,setUser}}>
        {children}
     </AuthContext.Provider>
    </>
}
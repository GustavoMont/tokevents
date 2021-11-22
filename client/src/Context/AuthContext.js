import React, { createContext, useEffect, useState } from "react";
import { handleToken } from "../utils/handleAuth";

const Context = createContext()

function AuthProvider({children}){
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() =>{
        const session  = JSON.parse(sessionStorage.getItem('@tokevents'))
        if (session) {
            (async ()=>{
                setIsAuth(await handleToken(session.token))
            })()
        }
    }, [])

    return (
        <Context.Provider value=  { {isAuth} } >
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }
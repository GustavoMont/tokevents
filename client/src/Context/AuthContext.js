import React, { createContext, useEffect, useState } from "react";
import Loading from "../Components/Loadings";
import { handleToken } from "../utils/handleForms";

const Context = createContext()

function AuthProvider({children}){
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        const session  = JSON.parse(sessionStorage.getItem('@tokevents'))
        setLoading(true)
        if (session) {
            (async ()=>{
                setIsAuth(await handleToken('Bearer ' + session.token))
                setLoading(false)
            })()
        }else{
            setLoading(false)
        }
    }, [])

    if (loading) {
        return(<Loading />)
    }

    return (
        <Context.Provider value=  { {isAuth} } >
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }
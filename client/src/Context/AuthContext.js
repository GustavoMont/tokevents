import React, { createContext, useEffect, useState } from "react";
import Loading from "../Components/Loadings";
import { handleToken } from "../utils/handleForms";

const Context = createContext()

function AuthProvider({children}){
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    // Contexto de autenticação do usuário
    useEffect(() =>{
        const session  = JSON.parse(sessionStorage.getItem('@tokevents'))
        setLoading(true)
        // se tem algo no sessionStorage ele vê se o token é válido
        // Enquanto verifica se é válido ele deixa o component Loading na tela
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
import React, { createContext, useState, useEffect } from "react";
import { randomBg } from "../utils/randomGenarate";

const Context = createContext() 

function EventProvider({children}){
    const [eventos, setEventos] = useState([]);
    const bgColors = ['--postit-yellow', '--postit-pink', '--postit-green', '--postit-orange']
    const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
    useEffect(() => {
        (async () => {
            const body = JSON.stringify({ user_id: token })
            const eventosRes = await fetch('/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': `Bearer ${token}`
                },
                body
            })
            const { events } = await eventosRes.json()
            if (eventos.erro) {
                window.location.href = '/'
                return
            };
            events.forEach(evento => { 
                evento.color =  `var(${randomBg(bgColors, 0, bgColors.length - 1)})` 
            })
            setEventos(events)
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Context.Provider value={{eventos, setEventos, token }} >
            {children}
        </Context.Provider>
    )
}


export { Context, EventProvider }
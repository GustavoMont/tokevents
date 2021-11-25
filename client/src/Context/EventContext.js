import React, { createContext, useState, useEffect } from "react";
import { randomBg } from "../utils/randomGenarate";

const Context = createContext() 

function EventProvider({children}){
    const [ naoConcluidos, setNaoConcluidos ] = useState([])
    const [ concluidos, setConcluidos ] = useState([])
    const bgColors = ['--postit-yellow', '--postit-pink', '--postit-green', '--postit-orange']
    const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
    useEffect(() => {
        (async () => {
            const body = JSON.stringify({ user_id: token })
            // Pega todos os eventos do usuário
            const eventosRes = await fetch('/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': `Bearer ${token}`
                },
                body
            })
            const { events } = await eventosRes.json()
            if (events.erro) {
                window.location.href = '/'
                return
            };
            // adiciona uma cor para cada evento
            events.forEach(evento => { 
                evento.color =  `var(${randomBg(bgColors, 0, bgColors.length - 1)})` 
            })
            // Separa os não concluídos dos compluídos
            const naoConcluidos = events.filter(evento => !(evento.complete || 
                new Date(evento.data_fim) < new Date()))
            const concluidos = events.filter(evento => (evento.complete || 
                new Date(evento.data_fim) < new Date()))
            setConcluidos(concluidos)
            setNaoConcluidos(naoConcluidos)
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Context.Provider value={{token, concluidos, setConcluidos, naoConcluidos, setNaoConcluidos }} >
            {children}
        </Context.Provider>
    )
}


export { Context, EventProvider }
import React, { useEffect, useState } from "react";
import Add from "../Components/Add";
import { randomBg } from '../utils/randomGenarate';
import PostIt from '../Components/PostIt'
import { formateDate } from '../utils/formateDate'
import '../styles/Home.css'

export default function Home() {
    const bgColors = ['--postit-yellow', '--postit-pink', '--postit-green', '--postit-orange']

    const [eventos, setEventos] = useState([])


    useEffect(() => {
        (async () => {
            const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
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
            setEventos(events)
        })()
    }, [])

    eventos.forEach(evento => {
        evento.color = randomBg(bgColors, 0, bgColors.length - 1)
    })

    return (
        <main id="home">
            <h1>HOME PAGE</h1>
            <div id="board">
                {eventos.length === 0 ? 'NENHUM EVENTO ADICIONADO' : eventos.map(evento => (
                    <PostIt title={evento.title} description={evento.description} key={evento._id}
                        data_inicio={formateDate(evento.data_inicio)}   data_fim={formateDate(evento.data_fim)} color={evento.color}
                    />
                ))}
            </div>
            <Add />
        </main>
    )
}
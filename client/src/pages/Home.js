import React, { useEffect, useState } from "react";
import Add from "../Components/Add";
import { randomBg } from '../utils/randomGenarate';
import PostIt from '../Components/PostIt'
import '../styles/Home.css'

export default function Home(){
    const bgColors = ['--postit-yellow', '--postit-pink', '--postit-green', '--postit-orange']
    
    const [eventos, setEventos] = useState([])

    useEffect(() =>{
        (async () =>{
            const eventosRes = await fetch('/events',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    body:{

                    }
                }
            })
        })()
    },[])

    eventos.forEach(evento => {
        evento.color = randomBg(bgColors ,0, bgColors.length-1)
    })

    return (
        <main id="home">
            <h1>HOME PAGE</h1>
            <div id="board">
            {eventos.map(evento => (
                <PostIt title={evento.title} description={evento.description} 
                    data_inicio={evento.data_inicio} data_fim={evento.data_fim} color={evento.color} 
                />
            ))}
        </div>
            <Add />
        </main>
    )
}
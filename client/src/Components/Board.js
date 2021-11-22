import React from "react";
import { randomBg } from "../utils/randomGenarate";
import PostIt from "./PostIt";

export default function Board(){
    const bgColors = ['--postit-yellow', '--postit-pink', '--postit-green', '--postit-orange']

    const eventos = []

    eventos.forEach(evento => {
        evento.color = randomBg(bgColors ,0, bgColors.length-1)
    })


    return (
        <div id="board">
            {eventos.map(evento => (
                <PostIt title={evento.title} description={evento.description} 
                    data_inicio={evento.data_inicio} data_fim={evento.data_fim} color={evento.color} 
                />
            ))}
        </div>
    )
}
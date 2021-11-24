import React, {useState, useEffect, useContext} from "react";
import { Context } from "../Context/EventContext";
import PostIt from "./PostIt";




export default function Concluidos(){
    const [concluidos, setConcluidos] = useState([])
    const { eventos } = useContext(Context)
    window.onscroll = () =>{
        const menu = document.querySelector('#menu')
        const menuHeigth = menu.clientHeight
        const board = document.querySelector('#board')
        const boardPos = board.getBoundingClientRect().top
        menu.classList.toggle('bg-active', boardPos <= menuHeigth )
    }

    useEffect(() =>{
        const concluidos = eventos.filter(evento => (evento.complete || 
            new Date(evento.data_fim) < new Date()))
        setConcluidos(concluidos)
    },[eventos])
    return (
        <div id="board">
                {concluidos.length === 0 ? <h1>NENHUM EVENTO CADASTRADO</h1> : concluidos.map(evento => (
                    <PostIt className="concluido" info={{...evento}}  isCompleted={true} key={evento._id} />
                ))}
        </div>
    )
}




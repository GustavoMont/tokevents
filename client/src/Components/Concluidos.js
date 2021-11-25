import React, { useContext} from "react";
import { Context } from "../Context/EventContext";
import PostIt from "./PostIt";




export default function Concluidos(){
    const {concluidos} = useContext(Context)
    window.onscroll = () =>{
        const menu = document.querySelector('#menu')
        const menuHeigth = menu.clientHeight
        const board = document.querySelector('#board')
        const boardPos = board.getBoundingClientRect().top
        menu.classList.toggle('bg-active', boardPos <= menuHeigth )
    }

    return (
        <div id="board">
                {concluidos.length === 0 ? <h1>NENHUM EVENTO CADASTRADO</h1> : concluidos.map(evento => (
                    <PostIt className="concluido" info={{...evento}}  isCompleted={true} key={evento._id} />
                ))}
        </div>
    )
}




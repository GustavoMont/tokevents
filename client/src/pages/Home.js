import React from "react";
import Add from "../Components/Add";
import Board from "../Components/Board";
import '../styles/Home.css'

export default function Home(){


    return (
        <main id="home">
            <h1>HOME PAGE</h1>
            <Board />
            <Add />
        </main>
    )
}
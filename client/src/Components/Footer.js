import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer(){

    return (
        <footer>
            <p>Desenvolvido com 💖 por <Link target="_blank" to="https://github.com/GustavoMont" >Gustavo Mont</Link></p>
        </footer>
    )
}
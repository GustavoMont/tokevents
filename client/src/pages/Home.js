/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import { Offcanvas, OffcanvasHeader, 
    OffcanvasBody
} from 'reactstrap'
import '../styles/Home.css'
import { Context } from '../Context/EventContext'



export default function Home() {
    const [openCanvas, setOpenCanvas] = useState(false)
    const { token } = useContext(Context)

    return (
        <main id="home"
        >
            {/* Cabeçalho =============== */}
            <div>
                <header  id="menu-container" >
                    <div id="menu">
                        <i className="fas fa-bars" id="menu-btn" 
                            onClick={() => setOpenCanvas(true)}
                        ></i>
                        <h1>Meus eventos</h1>
                    </div>

                </header>
                {/* Menu de opção ============================= */}
                <Offcanvas toggle={() => setOpenCanvas(false)} isOpen={openCanvas} >
                    <OffcanvasHeader toggle={() => setOpenCanvas(false)}>
                        <h4>{jwt.decode(token).nome}</h4>
                        <h5>@{jwt.decode(token).user_name}</h5>
                    </OffcanvasHeader>
                    <OffcanvasBody id="nav-container">
                        <nav>
                            <strong>
                                <Link to="/home" >
                                    <i class="far fa-calendar-alt" style={{color: 'black', marginRight:'.5rem' }} ></i>  
                                    <span>Meus Eventos</span>
                                </Link>
                            </strong>
                            <strong>
                                <Link to="/home/concluidos" >
                                    <i class="fas fa-check" style={{color: 'black', marginRight:'.5rem' }} ></i>  
                                    <span>Eventos Concluídos</span>
                                </Link>
                            </strong>
                            <strong>
                                <Link to="/" onClick={() =>{
                                    sessionStorage.removeItem('@tokevents')
                                }} >
                                    <i class="fas fa-sign-out-alt" style={{color: 'black', marginRight:'.5rem' }} ></i>  
                                    <span>Sair</span>
                                </Link>
                            </strong>
                        </nav>
                    </OffcanvasBody>
                </Offcanvas>
            </div>

            {/* Aqui vem os eventos cadastrados ============================================ */}
            <Outlet />
            
        </main>
    )
}
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
    const [openCanvas, setOpenCanvas] = useState(false) /*Vai abrir ou fechar o menu */
    const { token } = useContext(Context) /*Token passado pelo contexto de eventos EventeProvider */

    return (
        <main id="home"
        >
            {/* Cabeçalho =================================================== */}
            <div>
                <header  id="menu-container" >
                    <div id="menu">
                        <i className="fas fa-bars" id="menu-btn" 
                            onClick={() => setOpenCanvas(true)}
                        ></i>
                        <h1>Meus eventos</h1>
                    </div>

                </header>
                {/* Menu de opção ========================================= */}
                <Offcanvas toggle={() => setOpenCanvas(false)} isOpen={openCanvas} >
                    <OffcanvasHeader toggle={() => setOpenCanvas(false)}>
                        <h4>{jwt.decode(token).nome}</h4> {/*Nome do usuário que está armazenado no token */}
                        <h5>@{jwt.decode(token).user_name}</h5> {/*User name que está armazenado no token */}
                    </OffcanvasHeader>
                    <OffcanvasBody id="nav-container">
                        <nav>
                            <strong>
                                <Link to="/home" onClick={() => setOpenCanvas(false)} >
                                    <i class="far fa-calendar-alt" style={{color: 'black', marginRight:'.5rem' }} ></i>  
                                    <span>Meus Eventos</span>
                                </Link>
                            </strong>
                            <strong>
                                <Link to="/home/concluidos" onClick={() => setOpenCanvas(false)} >
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

            {/* Aqui vem o Board(eventos não concluídos
                ou os Elementos concluídos). Dependendo da rota em que o usuário se encontra ============================================ */}
            <Outlet />
            
        </main>
    )
}
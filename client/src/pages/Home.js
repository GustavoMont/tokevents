/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import {
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label,
    Input, Row, Col, Alert, FormFeedback,
    Button, Collapse, Offcanvas, OffcanvasHeader, OffcanvasBody
} from 'reactstrap'
import Add from "../Components/Add";
import PostIt from '../Components/PostIt'
import '../styles/Home.css'
import { Context } from '../Context/EventContext'
import { agendar } from '../utils/handleForms'

export default function Home() {
    const { eventos, setEventos } = useContext(Context)
    const [openModal, setOpenModal] = useState(false);
    const [openCanvas, setOpenCanvas] = useState(false)

    document.body.style.overflow = openModal ? 'hidden' : 'auto'
    window.onscroll = () =>{
        const menu = document.querySelector('#menu')
        const menuHeigth = menu.clientHeight
        const board = document.querySelector('#board')
        const boardPos = board.getBoundingClientRect().top
        menu.classList.toggle('bg-active', boardPos <= menuHeigth )
    }
    return (
        <main id="home"
        >
            <div>
                <header  id="menu" >
                    <Button
                        id="menu-btn"
                        color="primary"
                        onClick={() => setOpenCanvas(true)}
                    >
                        <i className="fas fa-bars"  ></i>
                    </Button>
                    <h1>Meus eventos</h1>

                </header>

                <Offcanvas toggle={() => setOpenCanvas(false)} isOpen={openCanvas} >
                    <OffcanvasHeader toggle={() => setOpenCanvas(false)}>
                        Offcanvas
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <strong>
                            <Link to="/home/concluidos" onClick={() =>{
                                sessionStorage.removeItem('@tokevents')
                            }} >HOME</Link>
                        </strong>
                    </OffcanvasBody>
                </Offcanvas>
            </div>
            <div id="board">
                {eventos.length === 0 ? 'NENHUM EVENTO ADICIONADO' : eventos.map(evento => (
                    <PostIt title={evento.title} description={evento.description} key={evento._id} id={evento._id}
                        data_inicio={evento.data_inicio} data_fim={evento.data_fim}
                        color={evento.color}
                    />
                ))}
            </div>
            <Add click={() => setOpenModal(true)} />
            <Modal
                toggle={() => setOpenModal(false)}
                isOpen={openModal}
                backdrop={false}
            >
                <ModalHeader toggle={() => setOpenModal(false)}>
                    Agendar um Novo Evento
                </ModalHeader>
                <ModalBody>
                    <Form action="/events/agendar" method="POST"
                        onSubmit={(e) => agendar(e, setEventos, setOpenModal, eventos)} >
                        <FormGroup>
                            <Label for={"title"}>Título do Evento: <span>*</span></Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Conferência em Wakanda..."
                                type="text"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description"> Uma breve descrição: <span>*</span></Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Vou ver o Pantera Negra tirar algumas fotos e discutir negócios"
                                type="textarea"
                                required
                            />
                        </FormGroup>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <Label for="data_inicio">Data de início: <span>*</span></Label>
                                    <Input id="data_inicio" name="data_inicio"
                                        placeholder={"DD/MM/YYYY"}
                                        type="date"
                                        required
                                    />
                                    <FormFeedback>
                                        <p id="data_inicio-msg"></p>
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="horas_inicio">A que horas: <span>*</span> </Label>
                                    <Input id="horas_inicio" name="horas_inicio"
                                        placeholder="15:00"
                                        type="time"
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <Label for="data_fim">Data de Fim:</Label>
                                    <Input id="data_fim" name="data_fim"
                                        placeholder="DD/MM/YYYY"
                                        type="date" required
                                    />
                                </FormGroup>
                                <FormFeedback>
                                    <p id="data_fim-msg"></p>
                                </FormFeedback>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="data_fim">A que horas:</Label>
                                    <Input id="horas_fim" name="horas_fim"
                                        placeholder="16:00"
                                        type="time" required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Collapse horizontal id="collapse-msg-agendar" >
                            <Alert
                                color="danger"
                            >
                                <p id="agendar-msg"></p>
                            </Alert>
                        </Collapse>
                        <hr />
                        <Button color="success">
                            Submit
                        </Button>

                    </Form>
                </ModalBody>
            </Modal>
        </main>
    )
}
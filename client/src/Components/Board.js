import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../Context/EventContext';
import {
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label,
    Input, Row, Col, Alert, FormFeedback,
    Button, Collapse
} from 'reactstrap'
import { agendar } from '../utils/handleForms'
import Add from "./Add";
import PostIt from './PostIt'





export default function Board(){
    const [naoConcluidos, setNaoConcluidos] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const { eventos, setEventos } = useContext(Context)
    document.body.style.overflow = openModal ? 'hidden' : 'auto'
    window.onscroll = () =>{
        const menu = document.querySelector('#menu')
        const menuHeigth = menu.clientHeight
        const board = document.querySelector('#board')
        const boardPos = board.getBoundingClientRect().top
        menu.classList.toggle('bg-active', boardPos <= menuHeigth )
    }

    useEffect(() =>{
        const naoConcluidos = eventos.filter(evento => !(evento.complete || 
            new Date(evento.data_fim) < new Date()))
        setNaoConcluidos(naoConcluidos)
    },[eventos])


    return (
        <>
        <div id="board">
                {naoConcluidos.length === 0 ? <h1>NENHUM EVENTO CADASTRADO</h1> : naoConcluidos.map(evento => (
                    <PostIt info={{...evento}} key={evento._id} 
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
        </>
    )
}


/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, 
    FormGroup, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import Add from "../Components/Add";
import { randomBg } from '../utils/randomGenarate';
import PostIt from '../Components/PostIt'
import { formateDate } from '../utils/formateDate'
import '../styles/Home.css'

export default function Home() {
    const bgColors = ['--postit-yellow', '--postit-pink', '--postit-green', '--postit-orange']
    const [openModal, setOpenModal] = useState(false);
    const [eventos, setEventos] = useState([])


    useEffect(() => {
        (async () => {
            const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
            const body = JSON.stringify({ user_id: token })
            const eventosRes = await fetch('/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': `Bearer ${token}`
                },
                body
            })
            const { events } = await eventosRes.json()
            if (eventos.erro) {
                window.location.href = '/'
                return
            };
            events.forEach(evento =>{evento.color = randomBg(bgColors, 0, bgColors.length-1)})
            setEventos(events)            
        })()
    }, [])
    document.body.style.overflow = openModal ? 'hidden' : 'auto'

    return (
        <main id="home" 
            
        >
            <h1>HOME PAGE</h1>
            <div id="board">
                {eventos.length === 0 ? 'NENHUM EVENTO ADICIONADO' : eventos.map(evento => (
                    <PostIt title={evento.title} description={evento.description} key={evento._id}
                        data_inicio={formateDate(evento.data_inicio)}   data_fim={formateDate(evento.data_fim)} 
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
                    <Form action="/home/agendar" onSubmit={async (e) =>{
                        e.preventDefault()
                        const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
                        const form = e.target
                        let { 
                            title, description,
                            data_inicio, horas_inicio,
                            data_fim, horas_fim
                        } = form
                        
                        title = title.value
                        description = description.value
                        data_inicio = new Date(`${data_inicio.value}T${horas_inicio.value}`).toISOString()
                        const bodyInfo = {title, description,
                            data_inicio,
                            user_id: `${token}`}
                        if (data_fim.value) {
                            data_fim = new Date(`${data_fim.value}T${horas_fim.value}`).toISOString()
                            bodyInfo.data_fim = data_fim
                        }
                        const body = JSON.stringify(bodyInfo)
                        
                        const agendarRes = await fetch('/events/agendar', {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json',
                                auth: `Bearer ${token}`
                            },
                            body
                        })
                        const resultado = await agendarRes.json()
                        if (resultado.erro) {
                            
                        }

                    }} >
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
                                        type="date"
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
                                        type="time"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

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
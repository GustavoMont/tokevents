import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, 
    FormGroup, Label, Input, Row, Col, Button } from 'reactstrap'
import '../styles/Add.css'


export default function Add() {

    const [openModal, setOpenModal] = useState(false)
    
     

    return (
        <>
            <button id="add-btn" onClick={() => setOpenModal(true)}>
                <i className="fas fa-plus"></i>
            </button>
            <Modal
                toggle={() => setOpenModal(false)}
                isOpen={openModal}
                backdrop={false}
            >
                <ModalHeader toggle={() => setOpenModal(false)}>
                    Agendar um Novo Evento
                </ModalHeader>
                <ModalBody>
                    <Form action="/home/agendar" onSubmit={(e) =>{
                        e.preventDefault()
                        const form = e.target
                        let { 
                            data_inicio, horas_inicio,
                            data_fim, horas_fim
                        } = form
                        
                        data_inicio = new Date(`${data_inicio.value}T${horas_inicio.value}`).toISOString()
                        data_fim = new Date(`${data_fim.value}T${horas_fim.value}`).toISOString() || ''
                        

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
        </>
    )
}
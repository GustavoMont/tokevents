import React, { useState, useContext } from "react";
import { Context } from "../Context/EventContext";
import { Modal, ModalBody, ModalHeader, 
    Button, Alert,
    Form, FormGroup, Label, 
    Input, Row, Col, FormFeedback, Collapse } from 'reactstrap'
import '../styles/Postit.css'
import { formateDate } from "../utils/formateDate";
import { update } from "../utils/handleForms";



export default function PostIt({ title, description, data_inicio, data_fim, color, id }) {
    const { setEventos, eventos } = useContext(Context);
    const [modalContent, setModalContent] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [openCollapse, setOpenCollapse] = useState(false)
    document.body.style.overflow = modalOpen ? 'hidden' : 'auto'
    return (
        <>
            <div className="postit" style={{ backgroundColor: `var(${color})` }}
                onClick={() => {
                    setModalContent({ title, description, data_inicio, data_fim, id })
                    setModalOpen(true)
                }}
            >
                <header>
                    <h1>{title}</h1>
                    <div id="options-container">
                        <div id="dot"></div>
                    </div>
                </header>
                <div className="desc">
                    <p>{description.slice(0, 200) + '...'}</p>
                </div>
                <p className="data" >{formateDate(data_inicio)} {data_fim ? ' - ' : ''} {formateDate(data_fim) || ''}</p>


            </div>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} >
                <ModalHeader toggle={() => { setModalOpen(false); setOpenCollapse(false) }}>
                    {modalContent.title}
                </ModalHeader>
                <ModalBody>
                    {modalContent.description}
                </ModalBody>
                <hr />
                <div className="post-it-btn">
                    <Button color="success">
                        Concluir Evento
                    </Button>
                    <Button color="warning"
                        onClick={() => {
                            setOpenCollapse(!openCollapse);
                            setIsEdit(true)
                        }}
                    >
                        Editar Evento
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => { setOpenCollapse(!openCollapse); setIsEdit(false) }}
                    >
                        Exluir Evento
                    </Button>
                </div>

                <Collapse isOpen={openCollapse}>
                    {isEdit ? (<div className="form-container">
                        <Form action="/events/update" method="PUT" id="edit"
                            onSubmit={(e) =>  update(e, setEventos, setModalOpen, eventos, modalContent.id)} >
                            <FormGroup>
                                <Label for={"title"}>Título do Evento: <span>*</span></Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder={modalContent.title}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description"> Uma breve descrição: <span>*</span></Label>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder={modalContent.description}
                                    type="textarea"
                                />
                            </FormGroup>
                            <Row>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label for="data_inicio">Data de início: <span>*</span></Label>
                                        <Input id="data_inicio" name="data_inicio"
                                            placeholder={"DD/MM/YYYY"}
                                            type="date" required
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
                                            type="time" required
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
                                            type="time" 
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
                    </div>) : (
                        <Alert
                            style={{ width: '95%', margin: '0 auto 1rem auto' }}
                            color="danger"
                        >
                            <p style={{ textAlign: 'center' }} ><strong>Deseja excluir esse evento?</strong></p>
                            <div className="post-it-delete">
                                <Button color="danger">
                                    Confirmar
                                </Button>
                                <Button
                                    onClick={() => setOpenCollapse(false)}
                                    color="secondary"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </Alert>
                    )}
                </Collapse>
            </Modal>
        </>
    )
}
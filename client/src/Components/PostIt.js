import React, { useState, useContext } from "react";
import { Context } from "../Context/EventContext";
import {
    Modal, ModalBody, ModalHeader,
    Button, Alert,
    Form, FormGroup, Label,
    Input, Row, Col, FormFeedback, Collapse
} from 'reactstrap'
import '../styles/Postit.css'
import { formateDate } from "../utils/formateDate";
import { update, remove, concluir } from "../utils/handleForms";




export default function PostIt({ info, isCompleted }) {
    const { setEventos, eventos } = useContext(Context);
    const [modalOpen, setModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [openCollapse, setOpenCollapse] = useState(false)
    document.body.style.overflow = modalOpen ? 'hidden' : 'auto'
    return (
        <>
            <div className={`postit`} style={{ backgroundColor: `${isCompleted ? 'gray' : info.color}` }}
                onClick={() => {
                    setModalOpen(true)
                }}
            >
                <header>
                    <h1>{info.title}</h1>
                    <div id="options-container">
                        <div id="dot"></div>
                    </div>
                </header>
                <div className="desc">
                    <p>{info.description.slice(0, 200) + '...'}</p>
                </div>
                <p className="data" >{formateDate(info.data_inicio)} {info.data_fim ? ` - ${formateDate(info.data_fim)} ` : ''}</p>


            </div>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} >
                <Collapse horizontal id="collapse-msg-deletar" >
                    <Alert
                        color="danger"
                    >
                        <p id="deletar-msg"></p>
                    </Alert>
                </Collapse>
                <ModalHeader toggle={() => { setModalOpen(false); setOpenCollapse(false) }}>
                    <h2>{info.title}</h2>
                    <p className="data-modal">Do dia {formateDate(info.data_inicio)} à {formateDate(info.data_fim)}</p>
                </ModalHeader>
                <ModalBody>
                    {info.description}
                </ModalBody>
                <hr />
                <div className="post-it-btn">
                    {isCompleted ? '' : (
                        <Button color="success" onClick={() => {
                            concluir(info._id, eventos, setEventos, setModalOpen)
                        }} >
                            Concluir Evento
                        </Button>)
                    }
                    {isCompleted ? '' : (
                        <Button color="warning"
                            onClick={() => {
                                setOpenCollapse(!openCollapse);
                                setIsEdit(true)
                            }}
                        >
                            Editar Evento
                        </Button>)}
                    <Button
                        color="danger"
                        onClick={() => { setOpenCollapse(!openCollapse); setIsEdit(false) }}
                    >
                        Exluir Evento
                    </Button>
                </div>

                <Collapse isOpen={openCollapse}>
                    {isEdit ? (<div className="form-container">
                        <h3>Editar Evento</h3>
                        <Form action="/events/update" method="PUT" id="edit"
                            onSubmit={(e) => update(e, setEventos, setModalOpen, eventos, info._id)} >
                            <FormGroup>
                                <Label for={"title"}>Título do Evento: <span>*</span></Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder={info.title}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description"> Uma breve descrição: <span>*</span></Label>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder={info.description}
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

                            <Collapse horizontal id="collapse-msg-editar" >
                                <Alert
                                    color="danger"
                                >
                                    <p id="editar-msg"></p>
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
                                <Button color="danger" onClick={() => remove(info._id, setEventos, eventos, setModalOpen)}>
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
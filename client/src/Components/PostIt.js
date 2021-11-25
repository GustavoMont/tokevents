import React, { useState, useContext } from "react";
import { Context } from "../Context/EventContext";
import {
    Modal, ModalBody, ModalHeader,
    Button, Alert,
    Form, FormGroup, Label,
    Input, Row, Col, FormFeedback, Collapse
} from 'reactstrap'
import '../styles/Postit.css'
import { formateDate, formateToDB } from "../utils/formateDate";
import { alterFetch } from "../utils/alterFetch";
import { showServerMessage } from '../utils/handleForms'



export default function PostIt({ info, isCompleted }) { /*isCompleted informa se são os eventos COncluídos ou não */
    const { setNaoConcluidos, naoConcluidos,
    setConcluidos, concluidos, token } = useContext(Context); //Contexto Event Provider 
    const [modalOpen, setModalOpen] = useState(false) //Abre fecha o modal
    const [isEdit, setIsEdit] = useState(false); // Fala se é um Collapse de edição ou não
    const [openCollapse, setOpenCollapse] = useState(false) // Abre ou fecha o Collapse
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
                    <p>{info.description.slice(0, 200) + '...'}</p> {/*Mostra apenas os 200 primeiros caracteres */}
                </div>
                <p className="data" >{formateDate(info.data_inicio)} {info.data_fim ? ` - ${formateDate(info.data_fim)} ` : ''}</p>


            </div>
            {/* Modal para mostrar com mais informações o evento do post it */}
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} >
                <Collapse horizontal id="collapse-msg-erro" > {/*Exibe mensagem de erro para concluir ou remover evento */}
                    <Alert
                        color="danger"
                    >
                        <p id="erro-msg"></p>
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
                {/* Se isCompleted não mostre o butão de edição */}
                <div className="post-it-btn">
                    {isCompleted ? '' : (
                        <Button color="success" onClick={async () => {
                            // Função para concluir um evento 
                            const resultado = await alterFetch( '/events/concluir' ,token, info._id, 'PUT')

                            if (resultado.erro) {
                                showServerMessage('erro', resultado.message)
                                return
                            }
                            setConcluidos([resultado, ...concluidos])
                            const naoConcluidosAtualizados = naoConcluidos.filter(evento => evento._id !== resultado._id)
                            setNaoConcluidos(naoConcluidosAtualizados)
                            setModalOpen(false)
                        }} >
                            Concluir Evento
                        </Button>)
                    }
                    {/* Se isCompleted não mostre o butão de edição */}
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
                    {/* Formulário de edição do evento */}
                    {isEdit ? (<div className="form-container">
                        <h3>Editar Evento</h3>
                        <Form action="/events/update" method="PUT" id="edit"
                            onSubmit={async (e) => {
                                e.preventDefault()
                                const form = e.target
                                let { title, description,
                                    data_inicio, horas_inicio,
                                    data_fim, horas_fim
                                } = form
                                title = title.value || undefined
                                description = description.value || undefined
                                // Formatando a data para o banco de dados
                                data_inicio = formateToDB(data_inicio.value, horas_inicio.value)
                                data_fim = formateToDB(data_fim.value, horas_fim.value)
                            
                            
                                const body = JSON.stringify({
                                    id: info._id, data_inicio, data_fim,
                                    title, description, user_id: token
                                })

                                const resultado = await alterFetch( 'events/update' ,token, info._id, 'PUT', body)
                                if (resultado.erro) {
                                    showServerMessage('editar', resultado.message)
                                    return
                                }
                                const naoConcluidosAtualizados = naoConcluidos.filter(evento => evento._id !== resultado._id)
                                setNaoConcluidos([resultado ,...naoConcluidosAtualizados])
                                setModalOpen(false)
                            }} >
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
                                <Button color="danger" onClick={async () => {
                                    // Função que faz a exclusão do evento
                                    const resultado = await alterFetch('/events/remove', token, info._id, 'DELETE')
                                    if (resultado.erro) {
                                        showServerMessage('erro', resultado.message)
                                        return
                                    }
                                    const naoConcluidosAtualizados = naoConcluidos.filter(evento => evento._id !== info._id)
                                    const concluidosAtualizados = concluidos.filter(evento => evento._id !== info._id)
                                    setConcluidos(concluidosAtualizados)
                                    setNaoConcluidos(naoConcluidosAtualizados)
                                    setModalOpen(false)
                                }}>
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
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Button, Collapse, Alert } from 'reactstrap'
import '../styles/Postit.css'



export default function PostIt({ title, description, data_inicio, data_fim, color }) {
    const [modalContent, setModalContent] = useState({})
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    return (
        <>
            <div className="postit" style={{ backgroundColor: `var(${color})` }}
                onClick={() => {
                    setModalContent({ title, description, data_inicio, data_fim })
                    setOpen(true)
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
                <p className="data" >{data_inicio} {data_fim ? ' - ' : ''} {data_fim || ''}</p>


            </div>
            <Modal isOpen={open} toggle={() => setOpen(false)} >
                <ModalHeader toggle={() => {setOpen(false); setOpenConfirm(false)}}>
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
                    <Button
                        color="danger"
                        onClick={() => setOpenConfirm(!openConfirm)}

                    >
                        Exluir Evento
                    </Button>
                </div>

                <Collapse isOpen={openConfirm}>
                    <Alert
                        style={{ width: '95%', margin: '0 auto 1rem auto' }}
                        color="danger"
                    >
                        <p style={{textAlign: 'center'}} ><strong>Deseja excluir esse evento?</strong></p>
                        <div className="post-it-delete">
                            <Button color="danger">
                                Confirmar
                            </Button>
                            <Button
                                onClick={() => setOpenConfirm(false)}
                                color="secondary"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Alert>
                </Collapse>
            </Modal>
        </>
    )
}
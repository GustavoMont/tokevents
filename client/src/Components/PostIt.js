import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { randomBg } from '../utils/randomGenarate'
import '../styles/Postit.css'



export default function PostIt({ title, description, data_inicio, data_fim }) {
    const bgColors = ['--postit-yellow', '--postit-pink', '--postit-green', '--postit-orange']
    
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="postit" style={{ backgroundColor: `var(${bgColors[randomBg(0, bgColors.length - 1)]})` }}>
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
            <Modal isOpen={open} toggle={() => setOpen(false)}>
                <ModalHeader>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    Modal body text goes here.
                </ModalBody>
            </Modal>
        </>
    )
}
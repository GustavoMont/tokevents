import React from "react";
import '../styles/Add.css'


export default function Add({click}) {
    return (
        <>
            {/* Esse botão abre um modal com um formulário para cadastrar um vento */}
            <button id="add-btn" onClick={click}>
                <i className="fas fa-plus"></i>
            </button>
        </>
    )
}
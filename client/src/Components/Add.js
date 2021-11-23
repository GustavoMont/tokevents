import React from "react";
import '../styles/Add.css'


export default function Add({click}) {
    return (
        <>
            <button id="add-btn" onClick={click}>
                <i className="fas fa-plus"></i>
            </button>
        </>
    )
}
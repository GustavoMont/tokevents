import React from 'react';




export default function Form({ inputs, butao, action, method, submit }) {
    return (
        <>
            <form action={action} method={method} onSubmit={submit}> 
                {inputs.map((input) => (
                    <div className="form-field" key={input.key} >
                        <label htmlFor={input.name}>{input.label}: </label>
                        <input type={input.type} name={input.name} id={input.name} required />
                    </div>
                ))}

                <hr />
                <button>{butao}</button>
            </form>
        </>
    )
}
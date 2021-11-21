import React from 'react'
import Form from '../Components/Form'

export default function Index(){
    const login = [
        {label: 'Usuário ou Email', name: 'login', type: 'text', key: 'login_login'},
        {label: 'Senha', name: 'senha', type: 'password', key: 'login_senha'},
    ]
    const cadastro = [
        {label: 'Email', name: 'email', type: 'email', key: 'cad_email'},
        {label: 'User Name', name: 'user_name', type: 'text', key: 'cad_user_name'},
        {label: 'Nome', name: 'nome', type: 'text', key: 'cad_nome'},
        {label: 'Senha', name: 'password', type: 'password', key: 'cad_pass'},
        {label: 'Confirmar senha', name: 'confirm', type: 'password', key: 'cad_confirm'},
    ]

    return (
        <>
            <section>
                <Form inputs={login} method={"POST"} action="/auth/login" butao="Login" />
                <hr />
                <Form inputs={cadastro} method={"POST"} action="/auth/signIn" butao="Cadastrar" />
                
            </section>
        </>
    )
}
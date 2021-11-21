import React from 'react'
import Form from '../Components/Form'
import { handleLogin } from '../utils/handleAuth'

export default function Home(){
    const login = [
        {label: 'Usuário ou Email', name: 'login', type: 'text'},
        {label: 'Senha', name: 'senha', type: 'password'},
    ]
    const cadastro = [
        {label: 'Email', name: 'email', type: 'email'},
        {label: 'User Name', name: 'user_name', type: 'text'},
        {label: 'Nome', name: 'user_name', type: 'text'},
        {label: 'Senha', name: 'password', type: 'password'},
        {label: 'Confirmar senha', name: 'confirm', type: 'password'},
    ]

    return (
        <>
            <section>
                <Form inputs={login} method={"POST"} action="localhost:8080/auth/login" butao="Login" submit={handleLogin}/>
                <hr />
                <Form inputs={cadastro} method={"POST"} action="localhost:8080/auth/signIn" butao="Cadastrar" />
                
            </section>
        </>
    )
}
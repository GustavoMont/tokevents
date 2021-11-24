import { formateToDB } from './formateDate'
const saveGoHome = (resultado) => {
    sessionStorage.setItem('@tokevents', JSON.stringify(resultado))
    window.location.href = '/home'
}

export const showServerMessage = (id, message) => {
    const msg = document.querySelector(`#${id}-msg`)
    document.querySelector(`#collapse-msg-${id}`).classList.add('show')
    msg.innerText = message
}

const handlePassword = (password) => {
    return(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) && password.length <= 16
)}

const handleName = (nome) => nome.includes('.') || nome.length < 3  || nome.includes('-')

const showFeedBack = (fieldName) => document.querySelector(`[data-field=${fieldName}]`).classList.add('is-invalid')

export const handleLogin  = async (e) =>{
        e.preventDefault()
        const form = e.target

        let {login, password} = form
        login = login.value
        password = password.value
        const body = JSON.stringify( {
            login, 
            password
        })

        const loginRes = await fetch('/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body
        })

        const resultado = await loginRes.json()
        if (resultado.erro) {
            showServerMessage('login',resultado.message)
            return
        }
        saveGoHome(resultado)
}


export const handleSignIn = async (e) => {

    e.preventDefault()
    const form = e.target
    const children = Array.from(document.querySelectorAll('[data-field]'))
    children.forEach(input => {
        input.classList.remove('is-invalid')
    })
    let {email, user_name, nome, 
        cad_password, confirm} = form
    

    email = email.value
    user_name = user_name.value
    nome = nome.value
    const password = cad_password.value
    if (password !== confirm.value) {
        return
    }
    if (!handlePassword(password)) {
        showFeedBack('cad_password')
        return
    }
    if (user_name.includes(' ') || handleName(user_name)) {
        showFeedBack('user_name')
        return
    }
    if (handleName(nome)) {
        showFeedBack('nome')
        return
    }
    const body = JSON.stringify({
        email, user_name, nome,
        password
    })
    const signInRes = await fetch("/auth/signIn", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body
    })
    
    const resultado = await signInRes.json()
    if (resultado.erro) {
        showServerMessage('sign', resultado.message)
        return
    }
    saveGoHome(resultado)
} 
export const handleToken = async (token)=>{
    const homeResponse = await fetch("/home", {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'auth': token
        }
    })
    const jsonRes = await homeResponse.json();
    return jsonRes.login
}

export const agendar = async (e, setEventos, setOpenModal, eventos, id) => {
    e.preventDefault()
    const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
    const form = e.target
    let {
        title, description,
        data_inicio, horas_inicio,
        data_fim, horas_fim
    } = form
    title = title.value
    description = description.value
    data_inicio = formateToDB(data_inicio.value, horas_inicio.value)
    data_fim = formateToDB(data_fim.value, horas_fim.value)
    const bodyInfo = {
        title, description,
        data_inicio,
        data_fim,
        user_id: `${token}`,
        id
    }
    
    
    const body = JSON.stringify(bodyInfo)
    const agendarRes = await fetch(`/events/agendar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            auth: `Bearer ${token}`
        },
        body
    })
    
    const resultado = await agendarRes.json()
    if (resultado.erro) {
        showServerMessage('agendar', resultado.message)
        return
    }
    resultado.color = '--postit-green'
    setEventos([resultado, ...eventos]);
    setOpenModal(false)
}

export const update = async (e, setEventos, setModalOpen, eventos, id) =>{
    e.preventDefault()
    const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
    const form = e.target
    let { title, description,
        data_inicio, horas_inicio,
        data_fim, horas_fim
    } = form
    title = title.value || undefined
    description = description.value || undefined

    data_inicio = formateToDB(data_inicio, horas_inicio)
    data_fim = formateToDB(data_fim, horas_fim)


    const body = JSON.stringify({
        id, data_inicio, data_fim,
        title, description, user_id: token
    })

    const updateRes = await fetch('/events/update', {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            auth: `Bearer ${token}`
        },
        body
    })
    const resultado = await updateRes.json()
    if (resultado.erro) {
        showServerMessage('editar', resultado.message)
        return
    }
    const naoAlterados = eventos.filter(evento => evento._id !== id )

    setEventos([resultado, ...naoAlterados])
    setModalOpen(false)
}

export const remove = async (id, setEventos, eventos, setModalOpen) => {
    const { token } = JSON.parse(sessionStorage.getItem('@tokevents'))
    const body = JSON.stringify({
        id: id,
        user_id: token
    })
    const removeReq = await fetch('/events/remove', {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            auth: `Bearer ${token}`
        },
        body
    })
    const resultado = await removeReq.json()
    if (resultado.erro) {
        showServerMessage('deletar', resultado.message)
        return
    }
    const eventosAtuais = eventos.filter(evento => evento._id !== id)
    setEventos(eventosAtuais)
    setModalOpen(false)
    
}
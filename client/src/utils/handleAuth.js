const saveGoHome = (resultado) => {
    sessionStorage.setItem('@tokevents', JSON.stringify(resultado))
    window.location.href = '/home'
}

const showServerMessage = (id, message) => {
    const msg = document.querySelector(`#${id}-msg`)
    document.querySelector(`#collapse-msg-${id}`).classList.add('show')
    msg.innerText = message
}

const handlePassword = (password) => {
    console.log(password);
    console.log(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) && password.length <= 16);
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
        console.log(input.classList);
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
        showServerMessage('cad', resultado.message)
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
    const jsonRes = await homeResponse.json()
    console.log(jsonRes);
    return jsonRes.login
}
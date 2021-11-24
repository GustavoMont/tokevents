import React from 'react'
import '../styles/Loading.css'
import { Spinner } from 'reactstrap'


export default function Loading(){
    return(
        <div id="loading-container" >
            <Spinner color="light" >
                Carregando...
            </Spinner>
        </div>
    )
}
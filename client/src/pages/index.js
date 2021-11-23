import React from 'react'
import { handleLogin, handleSignIn } from '../utils/handleAuth'
import '../styles/Index.css'
import {
    Button, Form, FormGroup, Input,
    Label, FormFeedback, Row, Col, FormText, Container,
    Alert,Collapse
} from 'reactstrap'

export default function Index() {

    return (
        <>
            <main>
                <section className="index-section">
                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="form-container" >
                                    <h1>Entrar</h1>
                                    <Form onSubmit={handleLogin}>
                                        <FormGroup>
                                            <Label for="login">E-mail ou Usuário: </Label>
                                            <Input type="text" name="login" id="login" required placeholder="E-mail ou Usuário..." />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">Senha: </Label>
                                            <Input type="text" name="password" id="password" required placeholder="Sua senha..." />
                                        </FormGroup>
                                        <Button className="submit-btn" type="submit" >Entrar</Button>
                                        <div  className="msg-container" >                                        
                                            <Collapse horizontal id="collapse-msg-login" >

                                                <Alert
                                                    color="danger"
                                                >
                                                    <p id="login-msg" ></p>
                                                </Alert>
                                            </Collapse>
                                        </div>
                                    </Form>
                                </div>
                            </Col>



                            <Col md="6" >
                                <div className="form-container" id="cadastro">
                                    <h1>Cadastre-se</h1>
                                    <Form onSubmit={handleSignIn} >
                                        <Row>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label for="nome">Nome: </Label>
                                                    <Input type="text" required id="nome" name="nome" 
                                                    placeholder="Seu nome aqui..."  data-field="nome" />
                                                </FormGroup>
                                                <FormFeedback>
                                                    Nome inválido.
                                                </FormFeedback>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <Label for="user_name">Nome de Usuário: </Label>
                                                    <Input type="text" name="user_name" id="user_name" 
                                                    placeholder="Um user_name bacana..." data-field="user_name" />
                                                    <FormFeedback>
                                                        Nome de usuário inválido. Não utilize pontos nem hífens.
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label for="email">E-mail: </Label>
                                            <Input type="email" required id="email" name="email" placeholder="Seu e-mail..." />
                                        </FormGroup>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label for="cad_password">Senha</Label>
                                                    <Input type="password" name="cad_password"
                                                        id="cad_password" 
                                                        placeholder="Digite uma senha forte..." data-field="cad_password" />
                                                    <FormText>
                                                        Sua senha deve ter de 8-16 caracteres, incluindo letras, números e caracteres especiais.
                                                    </FormText>
                                                    <FormFeedback>
                                                        Senha muito fraca!!!
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <Label for="confirm">Confirme sua senha</Label>
                                                    <Input type="password" name="confirm" id="confirm"
                                                        placeholder="Confirme sua senha..." data-field="confirm" />
                                                    <FormFeedback>
                                                        As senhas estão diferentes
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button className="submit-btn" >Cadastre-se</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

            </main>
        </>
    )
}
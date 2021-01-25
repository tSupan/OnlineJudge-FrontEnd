import React, { Component } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import '../../configs/Route'
import { SHA1 } from 'crypto-js'

/*
    @Title
    
    ~/src/component/form/LoginForm.js
    
    @Description
    
    登录框
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
//method="get" action={Route.REAREND_ROUTE["LoginByEmail"]}
export default class LoginFormByEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.loginEmailChange = this.loginEmailChange.bind(this);
        this.loginPasswordChange = this.loginPasswordChange.bind(this);
        this.loginByEmail = this.loginByEmail.bind(this);
    }

    render() {
        return (
            <Container>
                <Col xl={{ span: 6, offset: 3 }}>
                    <Form onSubmit={this.loginByEmail}>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="2">
                                账号
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" placeholder="邮箱" onChange={this.loginEmailChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="password">
                            <Form.Label column sm="2">
                                密码
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="密码" onChange={this.loginPasswordChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="submit">
                            <Button variant="primary" type="submit">
                                登录
                        </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Container>
        );
    }

    loginByEmail(event) {
        console.log("email: " + this.state.email + "  password: " + this.state.password);
        console.log(SHA1(this.state.password).toString());
        
        //TODO
    }

    loginEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    loginPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }


}
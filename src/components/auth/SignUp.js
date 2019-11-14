import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Row, Col } from 'reactstrap'
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class SignUp extends Component {

    // Set initial state
    state = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //
    handleSignUp = (e) => {

        e.preventDefault()
        let inputData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.newUser(inputData);
        this.props.history.push("/");
    }

    //
    render() {
        return (
            <Row className="my-5">
                <Col md={{ size: 4, offset: 4 }}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.handleSignUp}>
                                <FormGroup>
                                    <h3>Please sign up</h3>
                                </FormGroup>
                                <FormGroup>
                                    <hr className="spider-web"></hr>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input onChange={this.handleFieldChange} type="text"
                                        id="first-name"
                                        placeholder="First name"
                                        required="" autoFocus="" />
                                </FormGroup>
                                <FormGroup>
                                    <hr className="spider-web"></hr>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input onChange={this.handleFieldChange} type="text"
                                        id="last-name"
                                        placeholder="Last name"
                                        required="" autoFocus="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="userName">Username</Label>
                                    <Input onChange={this.handleFieldChange} type="text"
                                        id="userName"
                                        placeholder="Username"
                                        required="" autoFocus="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email address</Label>
                                    <Input onChange={this.handleFieldChange} type="email"
                                        id="email"
                                        placeholder="Email address"
                                        required="" autoFocus="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input onChange={this.handleFieldChange} type="password"
                                        id="password"
                                        placeholder="Password"
                                        required="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password_confirm">Password confirm</Label>
                                    <Input onChange={this.handleFieldChange} type="password"
                                        id="password_confirm"
                                        placeholder="Password Confirm"
                                        required="" />
                                    <hr className="spider-web"></hr>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit">Sign Up</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default SignUp

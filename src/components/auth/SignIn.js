import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Row, Col } from 'reactstrap'


class SignIn extends Component {

	// Set initial state
	state = {
		email: "",
		password: ""
	}

	// Update state whenever an input field is edited
	handleFieldChange = (evt) => {
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}

	handleSignIn = (e) => {
		e.preventDefault()
		// For now, just store the email and password that the customer enters into local storage.
		let credentials = { email: this.state.email, password: this.state.password }
		console.log("SignIn handleSignIn credentials:", credentials)
		this.props.setUser(credentials);
		this.props.history.push("/");
	}

	render() {

		console.log("Sign In")

		return (
			<div className="spooky-background">
				<Row className="my-5">
					<Col md={{ size: 4, offset: 4 }}>
						<Card>
							<CardBody>
								<Form onSubmit={this.handleSignIn}>
									<FormGroup>
										<h3>Please sign in</h3>
									</FormGroup>
									<hr className="spider-web"></hr>
									<FormGroup>
										<Label htmlFor="email">Email address</Label>
										<Input onChange={this.handleFieldChange} type="email"
											id="email"
											placeholder="Email Address"
											required="" autoFocus="" />
									</FormGroup>
									<FormGroup>
										<Label htmlFor="password">Password</Label>
										<Input onChange={this.handleFieldChange} type="password"
											id="password"
											placeholder="Password"
											required="" />
									</FormGroup>
									<hr className="spider-web"></hr>
									<FormGroup>
										<Button type="submit">Sign In</Button>
									</FormGroup>
								</Form>
							</CardBody>
						</Card>
						<div className="text-center">
							<Link className="nav-link" to="/signup">Sign Up!</Link>
						</div>

					</Col>
				</Row>
			</div>
		)
	}
}

export default SignIn

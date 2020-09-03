import React, {Component} from 'react';
import {Button, Form, Input, notification} from "antd";
import {Link} from "react-router-dom";

import './Signup.css'
import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../../consts";
import {signup} from "../../utils/APIUtils";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.isFormValidated = this.isFormValidated.bind(this)
    }

    handleInputChange(event, validationFunc) {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value
        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFunc(inputValue)
            }
        })
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault()
        const signupRequest = {
            name: this.state.fullname.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value,
        }
        signup(signupRequest).then(response => {
            console.log(response)
            notification.success({
                message: "Polling App",
                description: "Thank you! You are successfully registered. Please login to continue!",
            })
            this.props.history.push('/login')
        }).catch(error => {
            notification.error({
                message: "Polling App",
                description: error.message || "Sorry, something went wrong. Please try again!"
            })
        })
    }

    isFormValidated() {
        return !(
            this.state.fullname.validateStatus === 'success'
            && this.state.username.validateStatus === 'success'
            && this.state.email.validateStatus === 'success'
            && this.state.password.validateStatus === 'success'
        )
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form
                        onSubmitCapture={this.handleSubmit}
                        className="signup-form"
                    >
                        <Form.Item
                            label="Full Name"
                            hasFeedback
                            validateStatus={this.state.fullname.validateStatus}
                            help={this.state.fullname.errorMsg}
                        >
                            <Input
                                size="large"
                                name="fullname"
                                autoComplete="off"
                                placeholder="Your full name"
                                value={this.state.fullname.value}
                                onChange={(event) => this.handleInputChange(event, this.validateFullName)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}
                        >
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value}
                                // onBlur={}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}
                        >
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value}
                                // onBlur={}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}
                        >
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="signup-form-button"
                                disabled={this.isFormValidated()}>
                                Sign Up
                            </Button>
                            Already Registered? <Link to="/login">Login Now!</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }

    validateFullName = (fullname) => {
            if(fullname.length < NAME_MIN_LENGTH) {
                return {
                    validateStatus: 'error',
                    errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
                }
            } else if (fullname.length > NAME_MAX_LENGTH) {
                return {
                    validationStatus: 'error',
                    errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
                }
            } else {
                return {
                    validateStatus: 'success',
                    errorMsg: null,
                }
            }

    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
}

export default Signup;
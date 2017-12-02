import React, { Component } from 'react';

import axios from 'axios';

import { Link} from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            successful: false
        }
    }
    createUser = () => {
        var user = {}
        user.username = this.state.username;
        user.email = this.state.email;
        user.password = this.state.password;
        console.log(user);
        axios.post(`http://localhost:8080/user/create`, user)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ successful: true });
                }
                console.log(res)

            })
            .catch(error => console.log(error.response))
    }
    formValidationEmail = () => {
        if (!this.state.email) {
            return " is required";
        }
    }
    formValidationPassword = () => {
        var password = this.state.password;
        if (password) {
            if (String(password).length < 8) {
                return " (8 characters or more)";
            }
        }
    }
    render() {
        if (this.state.successful) {
            return (
                <div className='content register successful'>
                    <div className='message'>
                        <h1>Successfully registered a new user</h1>
                        You can now <Link to='/login'>Login here.</Link>
                    </div>
                </div>
            )
        }
        return (
            <div className='content register'>
                <h1>Register</h1>
                <h4>
                    Choose a Username, Email and a password to create a new account.
                </h4>
                <form>
                    <label htmlFor='username'>Username</label>
                    <input id='username' type='text'
                        placeholder='Choose a username'
                        onChange={e => this.setState({ username: e.target.value })}
                    />

                    <label htmlFor='email'>Email {this.formValidationEmail()}</label>
                    <input id='email' type='text'
                        placeholder='Enter your email'
                        onChange={e => this.setState({ email: e.target.value })}
                    />

                    <label htmlFor='user'>Password {this.formValidationPassword()}</label>
                    <input id='user' type='password'
                        placeholder='Enter your password'
                        onChange={e => this.setState({ password: e.target.value })}
                    />

                    <button onClick={this.createUser} type='button' className='button'>Sign Up</button>
                </form>
                Already have an account? <Link to='/login'>Login here.</Link>
            </div>
        )
    }
}
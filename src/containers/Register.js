import React, { Component } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: '',
            password: '',
            successful: false,
            validEmail: false,
            validPassword: false
        }
    }
    componentDidMount = () => {
        document.getElementById('email').focus();
        document.getElementById('password').focus();
        this.enableSubmitButton();
    }
    componentDidUpdate = () => {
        setTimeout(() => {
            document.getElementById('email').focus();
            this.enableSubmitButton();
        }, 1500)
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
    emailValidation = (val) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var label = document.getElementById('label-email');
        var input = document.getElementById('email');
        if (re.test(val)) {
            this.setState({ validEmail: true });

            label.classList.add('valid');
            input.classList.add('valid');

            label.classList.remove('invalid');
            input.classList.remove('invalid');
        }
        else {
            this.setState({ validEmail: false });

            label.classList.add('invalid');
            input.classList.add('invalid');

            label.classList.remove('valid');
            input.classList.remove('valid');
        }
        this.enableSubmitButton();
    }
    passwordValidation = (val) => {
        var label = document.getElementById('label-password');
        var input = document.getElementById('password');
        if (val.length > 7) {
            this.setState({ validPassword: true });

            label.classList.add('valid');
            input.classList.add('valid');

            label.classList.remove('invalid');
            input.classList.remove('invalid');
        }
        else {
            this.setState({ validPassword: false });

            label.classList.add('invalid');
            input.classList.add('invalid');

            label.classList.remove('valid');
            input.classList.remove('valid');
        }
        this.enableSubmitButton();
    }

    enableSubmitButton = () => {
        var validEmail = this.state.validEmail;
        var validPassword = this.state.validPassword;

        var submitButton = document.getElementById('submit-button');

        if (validEmail && validPassword) {
            submitButton.disabled = false;
            submitButton.classList.remove('disabled');
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
                <form ref='form'>
                    <label htmlFor='username'>Username</label>
                    <input id='username' className='input' type='text'
                        placeholder='Choose a username'
                        onChange={e => this.setState({ username: e.target.value })}
                    />

                    <label id='label-email' className='label' htmlFor='email'>Email</label>
                    <input autocpmplete='off' id='email' className='input email' type='email'
                        value={this.state.email}
                        placeholder='Enter your email'
                        onChange={e => {
                            var val = e.target.value;
                            this.setState({ email: val });
                            this.emailValidation(val);
                        }
                        }
                        onFocus={
                            this.focussed
                        }
                    />

                    <label id='label-password' className='label' htmlFor='password'>Password</label>
                    <input id='password' className='input password' type='password'
                        value={this.state.password}
                        placeholder='Enter your password'
                        onChange={e => {
                            var val = e.target.value;
                            this.setState({ password: e.target.value });
                            this.passwordValidation(val);
                        }
                        }
                        onFocus={
                            this.focussed
                        }
                    />

                    <button id='submit-button' onClick={this.createUser} type='button' className='button disabled'>Sign Up</button>
                </form>
                Already have an account? <Link to='/login'>Login here.</Link>
            </div>
        )
    }
}
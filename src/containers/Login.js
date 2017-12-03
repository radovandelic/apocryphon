import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validation: null
        }
    }
    findUser = () => {
        var { isLoggedIn } = this.props;
        var user = {}
        user.email = this.state.email;
        user.password = this.state.password;
        axios.post(`http://localhost:8080/user/login`, user, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    isLoggedIn(res.data);
                    this.setState({ validation: 'valid' })
                } else {
                    this.setState({ validation: 'invalid' })
                }
            })
            .catch(error => console.log(error.response))
    }
    emailValidation = (val) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var label = document.getElementById('label-email');
        var input = document.getElementById('email');
        if (re.test(val)) {
            console.log("valid")
            label.classList.add('valid');
            input.classList.add('valid');

            label.classList.remove('invalid');
            input.classList.remove('invalid');
        }
        else {
            console.log("INvalid")
            label.classList.add('invalid');
            input.classList.add('invalid');

            label.classList.remove('valid');
            input.classList.remove('valid');
        }

    }
    passwordValidation = (val) => {
        var label = document.getElementById('label-password');
        var input = document.getElementById('password');
        if (val.length > 7) {
            console.log("valid")
            label.classList.add('valid');
            input.classList.add('valid');

            label.classList.remove('invalid');
            input.classList.remove('invalid');
        }
        else {
            console.log("INvalid")
            label.classList.add('invalid');
            input.classList.add('invalid');

            label.classList.remove('valid');
            input.classList.remove('valid');
        }
    }
    render() {
        var { login } = this.props;
        console.log(login)
        return (
            <div className='content login'>
                <h1>Login</h1>
                <form>
                    <label id='label-email' className='label' htmlFor='email'>Email</label>
                    <input id='email' className='input email' type='email'
                        placeholder='Enter your email'
                        onChange={e => {
                            var val = e.target.value;
                            this.setState({ email: val });
                            this.emailValidation(val);
                        }
                        }
                    />

                    <label id='label-password' className='label' htmlFor='password'>Password</label>
                    <input id='password' className='input password' type='password'
                        placeholder='Enter your password'
                        onChange={e => {
                            var val = e.target.value;
                            this.setState({ password: e.target.value });
                            this.passwordValidation(val);
                        }
                        }
                    />

                    <button onClick={this.findUser} type='button' className='button'>Login</button>
                </form>
                Not registered yet? <Link to='/register'> Create a new account.</Link>
            </div>
        )
    }
}

const LoginFailed = () => {

    return (
        <h4>Email or Password wrong.</h4>
    )
}

const mapStateToProps = state => {
    return {
        login: state.login,
        level: state.level
    }
}

const mapDispatchToProps = dispatch => ({
    isLoggedIn(data) {
        dispatch({
            type: "IS_LOGGED_IN",
            data
        })
    }
})

Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default Login;
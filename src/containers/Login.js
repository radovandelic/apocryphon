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
                        }
                        }
                    />

                    <label id='label-password' className='label' htmlFor='password'>Password</label>
                    <input id='password' className='input password' type='password'
                        placeholder='Enter your password'
                        onChange={e => {
                            var val = e.target.value;
                            this.setState({ password: val });
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
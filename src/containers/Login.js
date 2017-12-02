import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    findUser = () => {
        var user = {}
        user.email = this.state.email;
        user.password = this.state.password;
        console.log(user);
        axios.post(`http://localhost:8080/user/login`, user)
            .then(res => {
                console.log(res)

            })
            .catch(error => console.log(error.response))
    }
    render() {
        //var { languages, match, words } = this.props;  
        console.log(this.state.email)
        console.log(this.state.password)
        return (
            <div className='content login'>
                <h1>Login</h1>
                <form>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='text'
                        placeholder='Enter your email'
                        onChange={e => this.setState({ email: e.target.value })} />

                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password'
                        placeholder='Enter your password'
                        onChange={e => this.setState({ password: e.target.value })} />

                    <button onClick={this.findUser} type='button' className='button'>Login</button>
                </form>
                Not registered yet? <Link to='/register'> Create a new account.</Link>
            </div>
        )
    }
}
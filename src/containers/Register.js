import React, { Component } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
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
                console.log(res)

            })
            .catch(error => console.log(error.response))
    }
    render() {
        return (
            <div className='content register'>
                <h1>Register</h1>
                <form>
                    <label htmlFor='username'>Username</label>
                    <input id='username' type='text'
                        placeholder='Choose a username'
                        onChange={e => this.setState({ username: e.target.value })}
                    />

                    <label htmlFor='email'>Email</label>
                    <input id='email' type='text'
                        placeholder='Enter your email'
                        onChange={e => this.setState({ email: e.target.value })}
                    />

                    <label htmlFor='user'>Password</label>
                    <input id='user' type='password' placeholder='Enter your password' />

                    <button onClick={this.createUser} type='button' className='button'>Sign Up</button>
                </form>
                Already have an account? <Link to='/login'>Login here.</Link>
            </div>
        )
    }
}
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Logout extends Component {
    logout = () => {
        axios.post(`http://localhost:8080/user/logout`)
            .then(res => {
                console.log(res)

            })
            .catch(error => console.log(error.response))
    }
    render() {
        return (
            <div className='content login'>
                <h1>Logout</h1>
                <form>
                    <button onClick={this.logout} type='button' className='button'>Logout</button>
                </form>
                Not registered yet? <Link to='/register'> Create a new account.</Link>
            </div>
        )
    }
}
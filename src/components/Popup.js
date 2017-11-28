import React from 'react';

import { Link } from 'react-router-dom';

class Popup extends React.Component {
    render() {
        return (
            <div className="popup-container">
                <div className="popup">
                    <div className='congrats-message'>
                        Congratulations! You finished the lesson!
                </div>
                    <div className='score-message'>
                        Your score is:
                </div>
                    <div className='correct'>Correct: {this.props.correct}</div>
                    <div className='wrong'>Wrong: {this.props.wrong}</div>
                    <Link to='/dashboard'>
                        <button className='button submit'>Back to the Dashboard</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Popup;
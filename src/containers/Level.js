import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Level extends Component {
    render = () => {
        const { changeLevel } = this.props;
        var { level } = this.props;        
        return (
            <p>
                <select defaultValue={level} id="levels" onChange={e => {
                    level = e.target.value;
                    changeLevel(level)
                }}>
                    <option value="noob">Noob</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                </select>
            </p>
        );
    }
}

// Map Redux state to component props
const mapStateToProps = state => {
    return {
        level: state.level
    }
}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => ({
    changeLevel(level) {
        dispatch({
            type: "CHANGE_LEVEL",
            level
        })
    }
})

// Connected Components
Level = connect(
    mapStateToProps,
    mapDispatchToProps
)(Level)


export default Level;
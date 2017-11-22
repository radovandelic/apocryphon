import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Languages extends Component {
    render = () => {
        const { changeLanguage } = this.props;
        var { language } = this.props;
        return (
            <p>
                <select defaultValue={language} id="languages" onChange={e => {
                    language = e.target.value;
                    changeLanguage(language)
                }}>
                    <option value="dutch">Dutch</option>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                </select>
            </p>
        );
    }
}

// Map Redux state to component props
const mapStateToProps = state => {
    return {
        language: state.language
    }
}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => ({
    changeLanguage(language) {
        dispatch({
            type: "CHANGE_LANGUAGE",
            language
        })
    }
})

// Connected Components
Languages = connect(
    mapStateToProps,
    mapDispatchToProps
)(Languages)

export default Languages;

/* If you only want to connect a component to a reducer/function:

Languages = connect(
    null,
    mapDispatchToProps
)(Languages)

*/

/* or if you only want to connect a component to a statet:

Languages = connect(
    mapStateToProps,
    null
)(Languages)

*/
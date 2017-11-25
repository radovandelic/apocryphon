import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Languages extends Component {
    render = () => {
        const { changeLanguage } = this.props;
        var { languages } = this.props;
        return (
            <p>
                <select defaultValue={languages} id="languages" onChange={e => {
                    languages = e.target.value;
                    changeLanguage(languages)
                }}>
                    <option value="nl">Dutch</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                </select>
            </p>
        );
    }
}

// Map Redux state to component props
const mapStateToProps = state => {
    return {
        language: state.languages
    }
}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => ({
    changeLanguage(languages) {
        dispatch({
            type: "CHANGE_LANGUAGES",
            languages
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
import React, { Component } from 'react';

import { Level, Languages } from './';
import { connect } from 'react-redux';

class Lesson extends Component {
    render = () => {
        var { languages, match, words } = this.props;
        var level = match.params.level;
        var currentWordImage = {
            backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O4U1BhYSDu4aPavo_237sC0w0r2eDgVKHVjkDPFhjvnywFDn)"
        }

        return (
            <div className="content lesson">
                <div className="left">
                    <h3>Level: {level}</h3>
                    <h3>Language: {languages.target}</h3>
                    <button onClick={() => { console.log(words[0].translations) }} className="button word active">{words[0].word}</button>
                    <button className="button word">{words[1].word}</button>
                    <button className="button word">{words[2].word}</button>
                    <button className="button word">{words[3].word}</button>
                    <button className="button word">{words[4].word}</button>
                    <button className="button word">{words[5].word}</button>
                    <button className="button word">{words[6].word}</button>
                    <button className="button word">{words[7].word}</button>
                    <button className="button word">{words[8].word}</button>
                    <button className="button word">{words[9].word}</button>
                </div>
                <div className="center">
                    <div className="title">Some title</div>
                    <h1 className="current-word">DEMURE</h1>
                    <img style={currentWordImage} className="current-image" alt="" ></img>
                    <input id="current-word-guess" className="input" placeholder="add the translated word"></input>
                    <div className="buttons">
                        <button type="button" className="button hint">Need a hint?</button>
                        <button type="button submit" className="button">Submit</button>
                    </div>
                </div>
                <div className="right">
                    <Languages />
                    <Level />
                    right sidebar
            </div>
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        languages: state.languages,
        level: state.level,
        words: state.words
    }
}
const mapDispatchToProps = dispatch => ({
    updateWordList(words) {
        dispatch({
            type: "UPDATE_WORD_LIST",
            words
        })
    }
})

Lesson = connect(
    mapStateToProps,
    mapDispatchToProps
)(Lesson)

export default Lesson;
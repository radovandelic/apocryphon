import React, { Component } from 'react';

import { Level, Languages } from './';
import { connect } from 'react-redux';

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWordId: 0,
            translated: [null, null, null, null, null, null, null, null, null, null],
            currentInput: null,
            ifCorrect: false
        }
    }
    changeCurrentWordId = (currentWordId) => {
        this.removeActive();
        this.setState({ currentWordId });
        this.setActive(currentWordId);
        this.removeCorrectClass();
        this.clearInput();
    }
    setActive = (id) => {
        var active = document.getElementById(id);
        active.classList.add("active");
    }
    removeActive = () => {
        var activeId = this.state.currentWordId;
        var active = document.getElementById(activeId);
        active.classList.remove("active");
    }
    checkAnswer = () => {
        var { words } = this.props;
        var translated = this.state.translated;
        var id = this.state.currentWordId;
        var input = this.state.input;
        var correct = 0;
        for (var i in words[id].translations) {
            if (input === words[id].translations[i]) {
                correct = 1;

                var buttons = document.getElementsByClassName('word');
                buttons[id].classList.add("correct");

                this.correctMessage();
            }
        }
        translated[id] = correct;
        this.setState({ translated: translated });
        setTimeout(() => {
            console.log(this.state.translated[id]);
        }, 200);
        console.log(correct ? "correct" : "wrong");
    }
    correctMessage = () => {
        var correctMessageDiv = document.getElementById("correct-message");
        correctMessageDiv.classList.add("show");

        var input = document.getElementById("current-word-guess");
        input.classList.add("correct");
    }
    clearInput = () => {
        var input = document.getElementById("current-word-guess");
        input.value = "";
        input.classList.remove("correct");
    }
    removeCorrectClass = () => {
        var correctMessageDiv = document.getElementById("correct-message");
        correctMessageDiv.classList.remove("show");
    }
    render = () => {
        var { languages, match, words } = this.props;
        var level = match.params.level;
        var currentWordImage = {
            backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O4U1BhYSDu4aPavo_237sC0w0r2eDgVKHVjkDPFhjvnywFDn)"
        }
        console.log(this.state.input);
        return (
            <div className="content lesson">
                <div className="left">
                    <h3>Level: {level}</h3>
                    <h3>Language: {languages.target}</h3>
                    <button id="0" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word active">{words[0].word}</button>
                    <button id="1" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[1].word}</button>
                    <button id="2" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[2].word}</button>
                    <button id="3" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[3].word}</button>
                    <button id="4" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[4].word}</button>
                    <button id="5" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[5].word}</button>
                    <button id="6" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[6].word}</button>
                    <button id="7" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[7].word}</button>
                    <button id="8" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[8].word}</button>
                    <button id="9" onClick={(e) => { this.changeCurrentWordId(e.target.id); }} className="button word">{words[9].word}</button>
                </div>
                <div className="center">
                <img style={currentWordImage} className="current-image" alt="" ></img>
                <div className="current-word">{words[this.state.currentWordId].word}</div>
                <div id="correct-message" className="correct-message">Correct answer!</div>
                    <input onChange={e => this.setState({ input: e.target.value })} id="current-word-guess" className="input" placeholder="add the translated word"></input>
                    <div className="buttons">
                        <button type="button" className="button hint">Need a hint?</button>
                        <button onClick={this.checkAnswer} type="button submit" className="button">Check!</button>
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
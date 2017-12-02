import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lang } from '../models';
import Popup from '../components/Popup';
import { flags } from '../models'

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWordId: 0,
            translated: [null, null, null, null, null, null, null, null, null, null],
            correct: 0,
            wrong: 0,
            completed: false,
            input: ''
        }
    }
    componentDidMount = () => {
        this.enterIsSubmit();
    }
    currentWord = () => {
        var { words } = this.props;
        return words[this.state.currentWordId].word;
    }
    enterIsSubmit = () => {
        document.addEventListener('keydown', (e) => {
            if ((13 === e.keyCode)) {
                this.checkAnswer();
            }
        })
        this.focusInput();
    }
    checkAnswer = () => {
        if (!this.state.input) return;
        var { words } = this.props;
        var translated = this.state.translated;
        var id = this.state.currentWordId;
        var input = this.state.input;

        var correct = 0;
        var buttons = document.getElementsByClassName('word');
        for (var i in words[id].translations) {

            if (input.trim() === words[id].translations[i]) {
                correct = 1;

                buttons[id].classList.add("correct");

                this.correctMessage();
            }
        }
        if (!correct) {
            buttons[id].classList.add("wrong");
            this.wrongMessage();
        }
        this.disableWordButton(id);
        this.updateTranslated(translated, id, correct);
    }
    changeCurrentWordId = (currentWordId) => {
        //if (currentWordId === 10) return;
        this.removeActive();
        this.setState({ currentWordId });
        this.setActive(currentWordId);
        this.removeCorrectClass();
        this.removeWrongClass();
        this.clearInput();
        this.focusInput();
    }
    focusInput = () => {
        document.getElementById('current-word-guess').focus();
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
    updateTranslated = (translated, id, correct) => {
        translated[id] = correct;
        this.setState({ translated: translated });

        this.updateScore(translated);
    }
    disableWordButton = (id) => {
        var buttons = document.getElementsByClassName('word');
        buttons[id].setAttribute("disabled", "true");
    }
    correctMessage = () => {
        var correctMessageDiv = document.getElementById("correct-message");
        correctMessageDiv.classList.add("show");

        var input = document.getElementById("current-word-guess");
        input.classList.add("correct");
    }
    wrongMessage = () => {
        var correctMessageDiv = document.getElementById("wrong-message");
        correctMessageDiv.classList.add("show");

        var input = document.getElementById("current-word-guess");
        input.classList.add("wrong");
    }
    clearInput = () => {
        var input = document.getElementById("current-word-guess");
        input.value = "";
        input.classList.remove("correct");
        input.classList.remove("wrong");
        //input.blur();
    }
    removeCorrectClass = () => {
        var correctMessageDiv = document.getElementById("correct-message");
        correctMessageDiv.classList.remove("show");
    }
    removeWrongClass = () => {
        var correctMessageDiv = document.getElementById("wrong-message");
        correctMessageDiv.classList.remove("show");
    }
    updateScore = (translated) => {

        var correct = 0;
        var wrong = 0;
        var completed = 0;

        translated.map((el, i) => {
            if (el === 1) {
                correct++;
                completed++;
                this.setState({ correct: correct });
            }
            if (el === 0) {
                wrong++;
                this.setState({ wrong: wrong });
                completed++;
            }
            if (completed === 10) {
                this.setState({ completed: true });
            }
        })
    }
    render = () => {
        var { languages, match, words, images } = this.props;
        var level = match.params.level;
        return (
            <div className="content lesson">
                {this.state.completed ? <Popup correct={this.state.correct} wrong={this.state.wrong} /> : ''}
                <div className="left">
                    <div className="level-text">Level:</div>
                    <div className="level-number">{level}</div>
                    <div className='flag_language'>
                        <img src={`/flags/${flags[languages.target].toLowerCase()}.svg`} className='flag' alt=' '></img>
                        <div className='language'>{lang[languages.target].name}</div>
                    </div>
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
                    <div className="current-word">{words[this.state.currentWordId].word}</div>
                    <div id="correct-message" className="correct-message">Correct answer!</div>
                    <div id="wrong-message" className="wrong-message">Wrong answer!</div>
                    <input onChange={e => {
                        this.setState({ input: e.target.value });
                    }} id="current-word-guess" className="input" placeholder="add the translated word"></input>
                    <div className="buttons">
                        <button type="button" className="button hint">Need a hint?</button>
                        <button onClick={this.checkAnswer} type="button submit" className="button">Check!</button>
                    </div>
                    <div className="img-container">
                        <img src={images[this.state.currentWordId]} className="current-image" alt="" ></img>
                    </div>
                </div>
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        languages: state.languages,
        level: state.level,
        words: state.words,
        images: state.images
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'request';
import translate from '../externals/translate';
import { updateWordList, updateTranslations } from '../actions';

class LevelProgress extends Component {
    render() {
        var { languages, stage, level, progress, updateWordList, updateTranslations } = this.props;
        var translations = [];
        var getTranslations = (wordlist, i) => {
            if (wordlist.errors) {
                console.log(wordlist.errors);
            }
            if (wordlist[i]) {
                translations[i] = {};
                translate(languages.target, languages.origin, wordlist[i].word, (err, data) => {
                    translations[i].err = err ? err : undefined;
                    translations[i].translations = data ? JSON.parse(data.body) : undefined;
                    i++;
                    getTranslations(wordlist, i);
                })
            } else {
                updateTranslations(wordlist, translations);
                translations = [];
            }
        }
        return (
            <div className='level-container'>
                <div className='level'>Level {level}</div>
                <div className='progress'>
                    <div className='bar' style={{ width: progress }}></div>
                </div>
                <div className='percents'>{progress}</div>
                <Link to={`/lesson/${stage}/${level}`}>
                    <button onClick={e => {
                        request.get(`https://philarios.ml/api/words/${languages.target}/${stage}/${Number(level)}`, (err, data) => {
                            updateWordList(err || JSON.parse(data.body));
                            if (!err) getTranslations(JSON.parse(data.body), 0);
                        });
                    }} className='button level_button'>Start Level</button>
                </Link>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        languages: state.languages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTranslations: (words, translations) => {
            dispatch(updateTranslations(words, translations));
        },
        updateWordList: (words) => {
            dispatch(updateWordList(words));
        }
    }
}

LevelProgress = connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelProgress)

export default LevelProgress;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'request';
import translate from '../externals/translate';
import { updateWordList, updateTranslations, updateImages } from '../actions';

class LevelProgress extends Component {
    render() {
        var { languages, stage, level, progress, updateWordList, updateTranslations, updateImages } = this.props;
        var translations = [];
        var images = [];
        for (let i = 0; i < 10; i++) {
            translations[i] = {};
        }
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
                    updateTranslations(wordlist, translations);
                    getTranslations(wordlist, i);
                })
            } else {
                translations = [];
            }
        }
        var getImages = (wordlist, i) => {
            if (wordlist[i]) {
                translate(languages.target, 'en', wordlist[i].word, (err, data) => {
                    var word = JSON.parse(data.body)[0];
                    request.get(`https://www.philarios.ml/api/images/${word}`, (err, data) => {
                        images[i] = JSON.parse(data.body);
                        i++;
                        updateImages(images);
                        getImages(wordlist, i);
                    })
                })
            } else {
                images = []
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
                            var wordlist = JSON.parse(data.body);
                            images = [];
                            getImages(wordlist, 0);
                            updateWordList(err || wordlist);
                            if (!err) getTranslations(wordlist, 0);
                        });
                    }} className='button level_button'>Start Level</button>
                </Link>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        languages: state.languages,
        words: state.words
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTranslations: (words, translations) => {
            dispatch(updateTranslations(words, translations));
        },
        updateWordList: (words) => {
            dispatch(updateWordList(words));
        },
        updateImages: (images) => {
            dispatch(updateImages(images));
        }
    }
}

LevelProgress = connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelProgress)

export default LevelProgress;
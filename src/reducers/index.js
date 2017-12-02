import { combineReducers } from 'redux';

function languageReducer(state = { origin: 'en', target: 'en' }, action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            if (action.direction === "origin") {
                return { ...state, origin: action.language }
            } else {
                return { ...state, target: action.language }
            }
        case 'RESET_LANGUAGE':
            return { origin: 'en', target: 'en' }
        default:
            return state
    }
}

function levelReducer(state = 'noob', action) {
    switch (action.type) {
        case 'CHANGE_LEVEL':
            return action.level
        case 'RESET_LEVEL':
            return 'beginner'
        default:
            return state
    }
}

var wordlist = []
for (let index = 0; index < 10; index++) {
    wordlist.push({ word: "loading...", frequency: 0, translations: ['loading...', 'loading...'] });
}
function wordListReducer(state = wordlist, action) {
    switch (action.type) {
        case 'UPDATE_WORD_LIST':
            return action.words;
        case 'UPDATE_TRANSLATIONS':
            var words = action.words;
            for (var i in words) {
                words[i].translations = action.translations[i].translations;
            }
            return words;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    languages: languageReducer,
    level: levelReducer,
    words: wordListReducer
});

export default rootReducer;
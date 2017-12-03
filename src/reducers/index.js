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
var imageList = []
for (let index = 0; index < 10; index++) {
    wordlist.push({ word: "loading...", frequency: 0, translations: ['loading...', 'loading...'] });
    imageList.push("https://www.vermeer.com.au/wp-content/uploads/2016/12/attachment-no-image-available.png");
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

function imageReducer(state = imageList, action) {
    switch (action.type) {
        case 'UPDATE_IMAGES':
            return action.images;
        default:
            return state
    }
}

function isLoggedInReducer(state = null, action) {
    switch (action.type) {
        case 'IS_LOGGED_IN':
            return action.data;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    languages: languageReducer,
    level: levelReducer,
    words: wordListReducer,
    images: imageReducer,
    login: isLoggedInReducer
});

export default rootReducer;
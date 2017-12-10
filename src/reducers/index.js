import { combineReducers } from 'redux';

var wordlist = []
var imageList = []
for (let index = 0; index < 10; index++) {
    wordlist.push({ word: "loading...", frequency: 0, translations: ['loading...', 'loading...'] });
    imageList.push("../sass/images/no-image.png");
}
var initStages = []
for (let i = 0; i < 200; i++) {
    initStages[i] = { levels: [] }
    for (let j = 0; j < 10; j++) {
        initStages[i].levels[j] = { words: [] }
    }
}

function languageReducer(state = { origin: 'en', target: 'de', stages: initStages }, action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            if (action.direction === "origin") {
                return { ...state, origin: action.language }
            } else {
                return { ...state, target: action.language }
            }
        case 'UPDATE_PROGRESS':
            return { ...state, stages: action.stages }
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
function activeStageReducer(state = '0', action) {
    switch (action.type) {
        case 'SET_ACTIVE_STAGE':
            return action.setStage
        default:
            return state
    }
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
    activeStage: activeStageReducer,
    words: wordListReducer,
    images: imageReducer,
    login: isLoggedInReducer
});

export default rootReducer;
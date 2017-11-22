import { combineReducers } from 'redux'

function languageReducer(state = 'english', action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return action.language
        case 'RESET_LANGUAGE':
            return 'english'
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



const rootReducer = combineReducers({
    language: languageReducer,
    level: levelReducer
});

export default rootReducer;
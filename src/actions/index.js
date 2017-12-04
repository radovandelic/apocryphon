export const changeOriginLanguage = language => {
    return {
        type: 'CHANGE_ORIGIN_LANGUAGE',
        language
    }
}

export const setStage = setStage => {
    return {
        type: 'SET_ACTIVE_STAGE',
        setStage
    }
}

export const changeLanguage = (language, direction) => {
    return {
        type: 'CHANGE_LANGUAGE',
        language,
        direction
    }
}

export const changeLevel = level => {
    return {
        type: 'CHANGE_LEVEL',
        level
    }
}

export const updateWordList = words => {
    return {
        type: 'UPDATE_WORD_LIST',
        words
    }
}
export const updateTranslations = (words, translations) => {
    return {
        type: 'UPDATE_TRANSLATIONS',
        words,
        translations
    }
}

export const updateImages = (images) => {
    return {
        type: 'UPDATE_IMAGES',
        images
    }
}

export const isLoggedIn = (data) => {
    return {
        type: 'IS_LOGGED_IN',
        data
    }
}

export const updateProgress = (stages) => {
    return {
        type: 'UPDATE_PROGRESS',
        stages,
    }
}
var request = require('request');

module.exports = (from, dest, phrase, callback) => {
    request.get(`https://philarios.ml/api/translate/${from}/${dest}/${phrase}`, callback)
}
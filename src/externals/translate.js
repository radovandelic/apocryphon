var request = require('request');

module.exports = (from, dest, phrase, callback) => {
    var query = {
        from,
        dest,
        phrase,
        format: 'json',
        pretty: 'false'
    }
    request.get("https://glosbe.com/gapi/translate", { qs: query }, callback)
}
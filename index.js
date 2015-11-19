require('es6-promise').polyfill()
require('isomorphic-fetch')

var client = function () {
}

// login with facebook, opens a new window
client.login = function () {
}

// get recommendations from tinder
// `limit` seems ignored.
client.recommendations = function (limit) {
}

// send a tinder message
client.message = function (userid, messsage) {
}

// swipe left
client.pass = function (userid) {
}

// swipe right
client.like = function (userid) {
}

// Gets the entire history for the user (all matches, messages, blocks, etc.)
client.history = function () {
}

// Updates the position for this user
client.position = function (lon, lat) {
}

// Get user by id
client.user = function (userid) {
}

module.exports = client

require('es6-promise').polyfill()
require('isomorphic-fetch')

// fetch doesn't throw on bad status.
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// convenience function: return JSON response
function parseJSON(response) {
  return response.json()
}

var headers = {
  'User-Agent' : 'Tinder Android Version 2.2.3',
  'os_version' : '16',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// simple fetch GET for tinder
function get(endpoint) {
  return fetch('https://api.gotinder.com/' + endpoint, {
    method: 'GET',
    headers: headers,
    credentials: 'include'
  })
    .then(checkStatus)
    .then(parseJSON)
}

// simple fetch POST for tinder
function post(endpoint, data) {
  return fetch('https://api.gotinder.com/' + endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
    credentials: 'include'
  })
    .then(checkStatus)
    .then(parseJSON)
}

var client = function () {
}

// login with facebook, opens a new window
client.login = function () {
}

// authenticate current facebook user for tinder
client.auth = function (fbToken, fbId) {
  return post('auth', {
    facebook_token: fbToken,
    facebook_id: fbId
  })
    .then(function(json) {
      headers['X-Auth-Token'] = json.token;
    })
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

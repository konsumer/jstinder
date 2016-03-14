if (typeof Promise === 'undefined') {
  require('es6-promise').polyfill()
}
if (typeof fetch === 'undefined') {
  require('isomorphic-fetch')
}

// fetch doesn't throw on bad status.
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// convenience function: return JSON response
function parseJSON (response) {
  return response.json()
}

// convenience function: just results, please
function getResults (response) {
  if (!response.results) {
    var error = new Error('No results')
    error.response = response
    throw error
  }
  return response.results
}

var headers = {
  'User-Agent': 'Tinder Android Version 2.2.3',
  'os_version': '16',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// simple fetch GET for tinder
function get (endpoint) {
  // console.log('GET', endpoint, headers)
  return fetch('https://api.gotinder.com/' + endpoint, {
    method: 'GET',
    headers: typeof Headers === 'undefined' ? headers : new Headers(headers)
  })
    .then(checkStatus)
    .then(parseJSON)
}

// simple fetch POST for tinder
function post(endpoint, data) {
  // console.log('POST', endpoint, data, headers)
  return fetch('https://api.gotinder.com/' + endpoint, {
    method: 'POST',
    headers: typeof Headers === 'undefined' ? headers : new Headers(headers),
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(parseJSON)
}

var client = function () {
}

// login with facebook, opens a new window
client.login = function () {
  return new Promise(function (resolve, reject) {
    var loginWindow = window.open('https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token', 'Login facebook', false)
    loginWindow.addEventListener('load', function () {
      var t = loginWindow.document.URL.match(/#access_token=(.+)&/)
      if (t && t[1]) {
        loginWindow.close()
        fetch('https://graph.facebook.com/v2.3/me?access_token=' + t[1])
          .then(function (r) {
            return r.json()
          })
          .then(function (me) {
            me.token = t[1]
            resolve(me)
          })
          .catch(reject)
      }
    })
  })
}

// authenticate current facebook user for tinder
client.auth = function (fbToken, fbId) {
  return post('auth', {
    facebook_token: fbToken,
    facebook_id: fbId
  })
    .then(function (json) {
      headers['X-Auth-Token'] = json.token
      client.token = json.token
    })
}

// get recommendations from tinder
client.recommendations = function () {
  return get('user/recs').then(getResults)
}

// send a tinder message
client.message = function (userId, message) {
  return post('user/matches/' + userId, {message: message})
}

// Updates the position for this user
// TODO: can I save other stuff in here?
client.position = function (lon, lat) {
  return post('user/ping', { lon: lon, lat: lat })
}

// Get user by id
client.user = function (userId) {
  return get('user/' + userId).then(getResults)
}

// swipe left
client.pass = function (userId) {
  return get('pass/' + userId)
}

// swipe right
client.like = function (userId) {
  return get('like/' + userId)
}

// Gets the entire history for the user (all matches, messages, blocks, etc.)
client.history = function () {
  return post('updates', {last_activity_date: ''})
}

module.exports = client

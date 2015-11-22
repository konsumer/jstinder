// test functionality in node

var tinder = require('../../')

// in headless nodejs, you can't login with facebook, so you need to set your facebook ID & token
var settings = require('./settings.json')

tinder.auth(settings.token, settings.id)
  .then(function(){
    tinder.recommendations()
      .then(function (recommendations) {
        console.log(JSON.stringify(recomendations, null, 2))
      })
      .catch(function (err) {
        console.error('recommendations Error: ' + err.response.statusText)
        console.log(JSON.stringify(err, null, 2))
      })
  })
  .catch(function (err) {
    console.error('Auth Error: ' + err.response.statusText)
    console.log(JSON.stringify(err, null, 2))
  })
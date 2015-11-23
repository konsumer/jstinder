// test functionality in node

var tinder = require('../../')

// in headless nodejs, you can't login with facebook, so you need to set your facebook ID & token
var settings = require('./settings.json')


// boring old error-handler
function err(e){
  console.error(e)
}

tinder.auth(settings.token, settings.id)
  .then(function(){
    tinder.recommendations()
      .then(function (recommendations) {
        console.log('recommendations', recommendations)

        tinder.user(recommendations[0]['_id'])
          .then(function(user){
            console.log('user', user)
          }, err)

        tinder.like(recommendations[0]['_id'])
          .then(function(l){
            console.log('like', l)
          }, err)

        tinder.history()
          .then(function (history) {
            console.log('history', history)
          }, err)


      }, err)
  }, err)
  
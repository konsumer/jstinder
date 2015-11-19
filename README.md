# tinderjs

A tinder API client that uses `fetch` and works in modern browsers, nodejs & react-native.

## usage

If you are using ES6 or react-native, it would look like this:

```js
import tinder from 'tinderjs'

tinder.login()
  .then((me) => {
    // `me` is facebook profile for you
    tinder.recommendations()
      .then((recommendations) => {
        // handle recommendations
      }, (err) => {
        // handle err here
      })
  }, (err) => {
    // handle err here
  })
```

If you are using ES5 in node/browserify, it would look like this:

```js
var tinder = require('tinderjs')

tinder.login()
  .then(function (me) {
    tinder.recommendations()
      .then(function (recommendations) {

      }, function (err) {

      })
  }, function (err) {

  })

```

If you are not using browserify/webpack/etc, you can add a script-tag pointing to the file `dist/tinderjs.min.js` and leave off the require.

## api

All of these return a Promise.

### tinder.login()
login with facebook, opens a new window

### tinder.recommendations()
get recommendations from tinder

### tinder.message(userid, messsage)
send a tinder message

### tinder.pass(userid)
swipe left

### tinder.like(userid)
swipe right

### tinder.history()
Gets the entire history for the user (all matches, messages, blocks, etc.)

### tinder.position(lon, lat)
Updates the position for this user

### tinder.user(userid)
Get user by id

## credit

I got a lot of ideas from [tinderjs](https://github.com/alkawryk/tinderjs)
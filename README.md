# jstinder

A tinder API client that uses `fetch` and works in nodewebkit, electron, nodejs & react-native.

## usage

If you are using ES6 in electron/nwjs, it would look like this:

```js
import tinder from 'jstinder'

tinder.login()
  .then((me) => {
    // `me` is facebook profile for you
    return tinder.auth(me.token, me.id)
      .then(tinder.recommendations)
      .then((recommendations) => {
        // handle recommendations
      })
  })
  .catch(err) => {
    // handle err here
  })
```

If you are using ES5 in electron/nwjs, it would look like this:

```js
var tinder = require('jstinder')

tinder.login()
  .then(function (me) {
    return tinder.auth(me.token, me.id)
      .then(tinder.recommendations)
      .then(function (recommendations) {
        // handle recommendations
      })
  })
  .catch(function (err) {
    // handle err here
  })

```

You can see more demos in the `demos/` dir.

## api

All of these return a Promise.

### tinder.auth(fbtoken, fbid)
authenticate tinder client with facebook auth token & id

### tinder.login()
login with facebook, opens a new window (requires browser window like nodewebkit or atom that can watch for changes on child window)

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

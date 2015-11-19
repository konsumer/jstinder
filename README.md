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
var tinder = require('tinder')

tinder.login()
  .then(function (me) {
    tinder.recommendations()
      .then(function (recommendations) {

      }, function (err) {

      })
  }, function (err) {

  })

```

If you are not using browserify/webpack/etc, you can add a script-tag pointing to the file in `dist/`.

## credit

I got a lot of ideas from [tinderjs](https://github.com/alkawryk/tinderjs)
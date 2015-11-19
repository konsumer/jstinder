# tinderjs

A tinder API client that uses `fetch` and works in modern browsers, nodejs & react-native.

## usage

### react

If you are using react and ES6 or react-native, it would look like this:

```js
import React from 'react'
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



## credit

I got a lot of ideas from [tinderjs](https://github.com/alkawryk/tinderjs)
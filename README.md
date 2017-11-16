# Vue Router Multiguard [![Build Status](https://travis-ci.org/atanas-angelov-dev/vue-router-multiguard.svg?branch=master)](https://travis-ci.org/atanas-angelov-dev/vue-router-multiguard)

Provides the ability to specify multiple guards for vue router routes.

## Installing

`npm install vue-router-multiguard`

## Notes

- Guards are executed serially in the order they are supplied.
- Guard execution will stop when all passed guards are executed OR when any guard calls `next()` with an argument other than `undefined`.
- When a guard calls `next()` with an argument other than `undefined`, that argument will be passed to VueRouter.

## Usage

`multiguard(function[] guards)` -> `function(to, from, next) {... }`

```js
import VueRouter from 'vue-router';
import multiguard from 'vue-router-multiguard';

const guard1 = function(to, from, next) {
    console.log('guard1 called');
    next();
}

const guard2 = function(to, from, next) {
    console.log('guard2 called');
    next();
}

const router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: {},
            beforeEnter: multiguard([guard1, guard2]),
        }
    ]
});
```

## Running the tests

`npm test`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

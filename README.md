react-hotkey
============

[![Build Status](https://travis-ci.org/glenjamin/react-hotkey.svg?branch=master)](https://travis-ci.org/glenjamin/react-hotkey)

A simple mixin for application hotkeys.

Provides a react synthetic event to the named event handler, but only when the
component is mounted.

For more info, check out the
[demo](https://rawgit.com/glenjamin/react-hotkey/master/example/index.html)
from the
[example](https://github.com/glenjamin/react-hotkey/tree/master/example)
folder.

Install
-------

    npm install react-hotkey --save

As of version 0.7.0, React 15.4+ is required. If you're using an older version
of react, then you should stick with 0.6.0.

Usage
-----

```js
var hotkey = require('react-hotkey');
// Enable event listening, can be safely called multiple times
hotkey.activate();
// The default is to listen for 'keyup' but you can listen to others by passing an argument
hotkey.activate('keydown');


React.createClass({
    mixins: [hotkey.Mixin('handleHotkey')],
    handleHotkey: function(e) {
        // receives a React Keyboard Event
        // http://facebook.github.io/react/docs/events.html#keyboard-events
    }
})
```

React Mixins do not work with ES2015. Instead one may use the `addHandler` and `removeHandler` functions:

```js
import React from 'react';
import hotkey from 'react-hotkey';
hotkey.activate();

class MyComponent extends React.Component {
    constructor() {
        this.hotkeyHandler = this.handleHotkey.bind(this);
    }

    handleHotkey(e) {
        console.log("hotkey", e);
    }

    componentDidMount() {
        hotkey.addHandler(this.hotkeyHandler);
    }

    componentWillUnmount() {
        hotkey.removeHandler(this.hotkeyHandler);
    }
}
```


Acknowledgements
----------------

This approach was extracted from
[react-bootstrap](https://github.com/react-bootstrap/react-bootstrap).


License
-------

MIT

react-hotkey
============

A simple mixin for application hotkeys.

Provide a react synthetic event


Install
-------

    npm install react-hotkey --save


Usage
-----

```js
var hotkey.Mixin = require('react-hotkey');

React.createClass({
    mixins: [hotkey.Mixin('handleHotkey')],
    handleHotkey: function(e) {
        // receives a React Keyboard Event
        // http://facebook.github.io/react/docs/events.html#keyboard-events
    }
})
```


Acknowledgements
----------------

This approach was extracted from
[react-bootstrap](https://github.com/react-bootstrap/react-bootstrap).


License
-------

MIT

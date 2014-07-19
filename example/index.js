var React = window.React = require('react');
var hotkey = require('../').activate();

var Component = React.createClass({
    displayName: 'Component',
    mixins: [hotkey.Mixin('handleHotkey')],
    getInitialState: function() {
        return { keys: [] };
    },
    clear: function() {
        this.replaceState(this.getInitialState());
    },
    handleHotkey: function(e) {
        e.preventDefault();
        this.state.keys.unshift(describeKey(e));
        this.setState({ keys: this.state.keys });
    },
    render: function() {
        return React.DOM.div({},
            React.DOM.h1({},
                React.DOM.a(
                    {href: "https://github.com/glenjamin/react-hotkey"},
                    "React-Hotkey"
                ),
                " Demo ",
                React.DOM.a({onClick: this.clear}, "[clear]")
            ),
            this.state.keys.map(function(pressedKey, i) {
                return React.DOM.p({key: i}, pressedKey);
            })
        );
    }
});

// Taken with gratitude from
// https://github.com/ccampbell/mousetrap/blob/master/mousetrap.js
// Copyright Craig Campbell licensed under the Apache 2.0 license.
var specials = {
    106: '*',
    107: '+',
    109: '-',
    110: '.',
    111 : '/',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
};

/**
 * Produce a useful textual description of the key being handled
 */
function describeKey(e) {
    var via = '';
    var desc = [];
    if (e.getModifierState("Shift")) desc.push("Shift");
    if (e.getModifierState("Control")) desc.push("Control");
    if (e.getModifierState("Alt")) desc.push("Alt");
    if (e.getModifierState("Meta")) desc.push("Meta");
    if (e.key !== 'Unidentified') {
        desc.push(e.key);
        via = 'e.key' + (e.nativeEvent.key ? '' : ' polyfill');
    } else if (e.nativeEvent.keyIdentifier) {
        var keyId = e.nativeEvent.keyIdentifier;
        if (keyId.substring(0, 2) === 'U+') {
            var code = parseInt(keyId.substring(2), 16);
            desc.push(String.fromCharCode(code));
        } else {
            desc.push(keyId);
        }
        via = 'e.keyIdentifier';
    } else if (specials[e.which]) {
        desc.push(specials[e.which]);
        via = 'e.which + lookup';
    } else {
        desc.push(String.fromCharCode(e.which));
        via = 'e.which';
    }
    e.persist();
    console.log(e);
    return '{' + desc.join('+') + '} (' + via + ')';
}

React.renderComponent(Component(), document.body);

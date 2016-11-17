/*eslint-env browser */
/*global describe, beforeEach, it, expect*/ // test runner globals

var u = require('../test-utils');
var triggerKey = u.triggerKey;

var hotkey, app, events;

describe('mounting', function() {

    beforeEach(function() {
        events = [];
        hotkey = require('../').activate();
        app = render();
    });

    describe("not mounted", function() {
        it('should not respond to hotkeys', function() {
            triggerKey(document);
            triggerKey(document);
            expect(events.length).toBe(0);
        });
    });

    describe("mounted", function() {
        beforeEach(function() {
            app.setState({mount: true});
        });
        it('should respond to hotkeys', function() {
            triggerKey(document);
            triggerKey(document);
            expect(events.length).toBe(2);
        });
    });

});

var React = require('react');
var ReactDOM = require('react-dom');
var div = document.createElement("div");
document.body.appendChild(div);
function render() {
    var App = React.createClass({
        getInitialState: function() {
            return { mount: false };
        },
        render: function() {
            if (this.state.mount) {
                return React.createElement(Component);
            } else {
                return null;
            }
        }
    });
    var Component = React.createClass({
        mixins: [hotkey.Mixin('hotkey')],
        hotkey: function(e) {
            events.push(e);
        },
        render: function() {
            return React.DOM.div({}, "div");
        }
    });
    ReactDOM.unmountComponentAtNode(div);
    return ReactDOM.render(React.createElement(App), div);
}

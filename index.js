var EventListener = require('react/lib/EventListener');
var SyntheticKeyboardEvent = require('react/lib/SyntheticKeyboardEvent');

module.exports = {
    Mixin: HotkeyMixin
};

function HotkeyMixin(handlerName) {
    return {
        componentDidMount: function() {
            var handler = this[handlerName];
            this.__hotkeyListener =
                EventListener.listen(document, 'keyup', function(nativeEvent) {
                    var event = SyntheticKeyboardEvent.getPooled(
                        {}, 'hotkey', nativeEvent
                    );
                    handler(event);
                    event.constructor.release(event);
                    if (event.returnValue === false) {
                        nativeEvent.preventDefault();
                        return false;
                    }
                });
        },
        componentDidUnmount: function() {
            this.__hotkeyListener.remove();
        }
    };
}

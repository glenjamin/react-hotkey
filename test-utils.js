/*eslint-env browser */
exports.triggerKey = triggerKey;
function triggerKey(target, eventData) {
    var event = document.createEvent('KeyboardEvent');
    event.initEvent('keyup', true, true);
    Object.keys(eventData || {}).forEach(function(k) {
        event[k] = eventData[k];
    });
    return target.dispatchEvent(event);
}

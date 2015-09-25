/*eslint-env browser */
exports.triggerKey = triggerKey;
function triggerKey(target, eventData, eventType) {
    var event = document.createEvent('KeyboardEvent');
    event.initEvent(eventType || 'keyup', true, true);
    Object.keys(eventData || {}).forEach(function(k) {
        event[k] = eventData[k];
    });
    return target.dispatchEvent(event);
}

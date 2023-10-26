"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTypes = exports.ports = void 0;
exports.ports = {
    client: 3000,
    posts: 5000,
    comments: 5001,
    query: 5002,
    moderation: 5003,
    eventBus: 5050
};
var eventTypes;
(function (eventTypes) {
    eventTypes["postCreated"] = "post_create";
    eventTypes["commentCreated"] = "comment_created";
    eventTypes["commentModerated"] = "comment_moderated";
    eventTypes["commentUpdated"] = "comment_updated";
})(eventTypes || (exports.eventTypes = eventTypes = {}));

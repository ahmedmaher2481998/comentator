export const ports = {
    client: 3000,
    posts: 5000,
    comments: 5001,
    query: 5002,
    moderation: 5003,
    eventBus: 5050
}


export enum eventTypes {
    postCreated = "post_create",
    commentCreated = "comment_created",
    commentModerated = "comment_moderated",
    commentUpdated = "comment_updated"
}
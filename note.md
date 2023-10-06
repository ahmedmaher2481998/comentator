### notes

1- setup react app and 2 express servers with 2DBs
2- implement get posts ,post post {title:String },save in redis
3- GET posts/:id/comments POST posts/:id/comments content
4- in client make your main layout - App , postCreate ,postList ,commentCreate ,commentList
5- add content moderation

how it will work
comment -> comment service created comment and emit
event bus emit to moderation & query (status pending)

<!-- moderation receive commentCreated moderate it and change statue and emit to comment via event bus service type CommentModerated -->

<!-- commentService receive type CommentModerated it then emit to event Bus type commentUpdated -->

<!-- query service receives comment updated it updated the comment it has -->

export class Comment {
    constructor(commentID, post, commenter, text, replyTo, rootTag, deletedTag) {
        this.commentID = commentID;
        this.post = post;
        this.commenter = commenter;
        this.text = text;
        this.replyTo = replyTo;
        this.rootTag = rootTag;
        this.deletedTag = deletedTag;
    }
}
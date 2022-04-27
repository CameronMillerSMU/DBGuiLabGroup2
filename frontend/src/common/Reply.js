export class Reply {
    constructor(userId,
        userName,
        full_text,
        date,
        likes) {
        this.userName = userName;
        this.full_text = full_text;
        this.date = date;
        this.userId = userId;
        this.likes = likes;
    }
}
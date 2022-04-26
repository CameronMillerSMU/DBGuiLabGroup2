export class PlantPost {
    constructor(plantImg,
        plantPostHeader,
        plantPostContent,
        userId,
        likes,
        replies) {
        this.plantImg = plantImg;
        this.plantPostHeader = plantPostHeader;
        this.plantPostContent = plantPostContent;
        this.likes = likes;
        this.userId = userId;
        this.replies = replies;
    }
}
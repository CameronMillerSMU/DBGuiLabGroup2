export class PlantPost {
    constructor(plantImg,
        plantPostHeader,
        plantPostContent,
        userId,
        posterId) {
        this.plantImg = plantImg;
        this.plantPostHeader = plantPostHeader;
        this.plantPostContent = plantPostContent;
        this.userId = userId;
        this.posterId = posterId;
    }
}
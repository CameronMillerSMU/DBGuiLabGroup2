export class User {
    constructor(username, password, birthDate, location, adminTag, registeredTag, privateTag, imagePath, backgroundPath) {
        //base variables
        this.username = username;
        this.password = password;
        this.birthDate = birthDate;
        this.location = location;
        this.adminTag = adminTag;
        this.registeredTag = registeredTag;
        this.privateTag = privateTag;
        this.imagePath = imagePath;
        this.backgroundPath = backgroundPath;        
    }
}
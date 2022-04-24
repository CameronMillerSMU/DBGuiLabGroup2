//------------------DONE-------------------
export class User {
    constructor(username, password, birthDate, location, adminTag, registeredTag, privateTag, backgroundPic, favoritePlants, ownedPlants) {
        //base variables
        this.username = username;
        this.password = password;
        this.birthDate = birthDate;
        this.location = location;
        this.adminTag = adminTag;
        this.registeredTag = registeredTag;
        this.privateTag = privateTag;
        this.backgroundPic = backgroundPic;

        //wishlist
        this.favoritePlants = favoritePlants;
        this.ownedPlants = ownedPlants;

        
    }
}
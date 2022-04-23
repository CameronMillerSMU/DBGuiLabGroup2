export class Location {
    constructor(location, tempLow, tempHigh, lastUpdated, weatherType, nearbyStores) {
        this.location = location;
        this.tempLow = tempLow;
        this.tempHigh = tempHigh;
        this.lastUpdated = lastUpdated;
        this.weatherType = weatherType;
        this.nearbyStores = nearbyStores;
    }
}
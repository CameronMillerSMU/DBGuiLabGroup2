-- Create Database Flora
CREATE DATABASE flora;

-- Use Database
USE flora;

CREATE TABLE flora.plants (
    name VARCHAR(300) PRIMARY KEY,
    description VARCHAR(500),
    category VARCHAR(300),
    climate VARCHAR(300),
    imagePath VARCHAR(300),
    water VARCHAR(300),
    sunlight VARCHAR(300),
    soil VARCHAR(300)
);

CREATE TABLE flora.location (
    cityName VARCHAR(300) PRIMARY KEY,
    tempLow FLOAT,
    tempHigh FLOAT,
    lastUpdate DATETIME,
    weatherType VARCHAR(300),
    nearestStore VARCHAR(300)
);

CREATE TABLE flora.users (
    username VARCHAR(300) PRIMARY KEY,
    password VARCHAR(300) NOT NULL,
    birthday DATE,
    location VARCHAR(300),
    registerTag BOOLEAN,
    privateTag BOOLEAN,
    adminTag BOOLEAN,
    imagePath VARCHAR(300),
    backgroundPath VARCHAR(500),
    FOREIGN KEY (location) REFERENCES location(cityName)
);

CREATE TABLE flora.ownedPlants (
    id INTEGER PRIMARY KEY auto_increment,
    owner VARCHAR(300) NOT NULL,
    name VARCHAR(300) NOT NULL,
    privateTag BOOLEAN,
    lastWatered DATETIME,
    insideTag BOOLEAN,
    favoriteTag BOOLEAN,
    currentTasks VARCHAR(300),
    specificPhoto VARCHAR(300),
    FOREIGN KEY (owner) REFERENCES users(username),
    FOREIGN KEY (name) REFERENCES plants(name)
);

CREATE TABLE flora.forum (
    topic VARCHAR(300) PRIMARY KEY,
    description VARCHAR(300) NOT NULL
);

CREATE TABLE flora.plantPost (
    postId INTEGER PRIMARY KEY auto_increment,
    topic VARCHAR(300) NOT NULL,
    poster VARCHAR(300) NOT NULL,
    title VARCHAR(300) NOT NULL,
    post VARCHAR(300) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    FOREIGN KEY(poster) REFERENCES users(username),
    FOREIGN KEY (topic) REFERENCES forum(topic)
);

CREATE TABLE flora.comment (
    commentId INTEGER PRIMARY KEY auto_increment,
    postId INTEGER NOT NULL,
    commentAuthor VARCHAR(300) NOT NULL,
    post VARCHAR(300) NOT NULL,
    replyTo INTEGER,
    rootTag VARCHAR(300) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    FOREIGN KEY (postId) REFERENCES plantPost(postId),
    FOREIGN KEY (commentAuthor) REFERENCES users(username),
    FOREIGN KEY (replyTo) REFERENCES comment(commentId)
);

CREATE TABLE flora.wishTicket (
    ticketId INTEGER PRIMARY KEY auto_increment,
    username VARCHAR(300) NOT NULL,
    plant VARCHAR(300) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (plant) REFERENCES plants(name)
);

CREATE TABLE flora.like (
    commentId INTEGER PRIMARY KEY auto_increment,
    postId INTEGER NOT NULL,
    user VARCHAR(300) NOT NULL,
    FOREIGN KEY (commentId) REFERENCES comment(commentId),
    FOREIGN KEY (postId) REFERENCES plantPost(postId),
    FOREIGN KEY (user) REFERENCES users(username)
);

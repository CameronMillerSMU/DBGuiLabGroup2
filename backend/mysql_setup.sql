-- create database db
CREATE DATABASE flora;

-- use newly create database
USE flora;

-- create table in db
CREATE TABLE flora.plants (
    name VARCHAR(30) NOT NULL,
    description VARCHAR(100),
    category VARCHAR(30),
    climate VARCHAR(30),
    imagePath VARCHAR(200),
    PRIMARY KEY (name)
);

SELECT * FROM plants;

CREATE TABLE flora.location(
    cityName VARCHAR(30),
    tempLow int,
    tempHigh int,
    lastUpdate DATETIME,
    weatherType VARCHAR(30),
    nearestStore VARCHAR(30),
    PRIMARY KEY (cityName)
);

SELECT * FROM location;

CREATE TABLE flora.user(
    username VARCHAR(30) NOT NULL,
    passwordHash VARCHAR(30) NOT NULL,
    birthday DATE NOT NULL,
    location VARCHAR(30),
    adminTag BOOLEAN NOT NULL,
    registerTag BOOLEAN NOT NULL,
    privateTag BOOLEAN NOT NULL,
    backgroundPath VARCHAR(200),
    PRIMARY KEY (username));

CREATE TABLE flora.ownedPlants(
    id int SERIAL DEFAULT VALUE,
    owner VARCHAR(30) NOT NULL,
    type VARCHAR(30) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    lastWatered DATETIME NOT NULL,
    insideTag BOOLEAN NOT NULL,
    todaysTasks VARCHAR(30),
    specificPhoto VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES user(username),
    FOREIGN KEY (type) REFERENCES plants(name)
);

CREATE TABLE flora.plantPost(
    postId int SERIAL DEFAULT VALUE,
    topic VARCHAR(30) NOT NULL,
    poster VARCHAR(30) NOT NULL,
    title VARCHAR(30) NOT NULL,
    text VARCHAR(144) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    likeCounter INT NOT NULL,
    PRIMARY KEY (postId),
    FOREIGN KEY(poster) REFERENCES user(username),
    FOREIGN KEY (topic) REFERENCES forum(topic)
);

CREATE TABLE flora.forum(
    topic VARCHAR(30) NOT NULL,
    description VARCHAR(30) NOT NULL,
    PRIMARY KEY (topic)
);

CREATE TABLE flora.comment(
    commentID INT SERIAL DEFAULT VALUE,
    postId INT NOT NULL,
    commentAuthor VARCHAR(30) NOT NULL,
    text VARCHAR(144) NOT NULL,
    replyTo VARCHAR(30) NOT NULL,
    rootTag VARCHAR(30) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    likeCounter INT NOT NULL,
    PRIMARY KEY (commentID),
    FOREIGN KEY (postId) REFERENCES plantPost(postId),
    FOREIGN KEY (commentAuthor) REFERENCES user(username),
    FOREIGN KEY (replyTo) REFERENCES user(username)
);

CREATE TABLE flora.wishTicket(
    ticketId INT SERIAL DEFAULT VALUE,
    user VARCHAR(30) NOT NULL,
    plant VARCHAR(30) NOT NULL,
    PRIMARY KEY (ticketId),
    FOREIGN KEY (user) REFERENCES user(username),
    FOREIGN KEY(plant) REFERENCES plants(name)
);
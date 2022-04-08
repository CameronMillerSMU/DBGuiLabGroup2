-- Create Database DB
CREATE DATABASE flora;

-- Use Newly Create Database
USE flora;

CREATE TABLE flora.plants (
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300),
    category VARCHAR(100),
    climate VARCHAR(100),
    imagePath VARCHAR(300),
    PRIMARY KEY (name)
);

CREATE TABLE flora.location(
    cityName VARCHAR(100),
    tempLow float,
    tempHigh float,
    lastUpdate DATETIME,
    weatherType VARCHAR(100),
    nearestStore VARCHAR(100),
    PRIMARY KEY (cityName)
);

CREATE TABLE flora.users(
    username VARCHAR(100) NOT NULL,
    passwordHash VARCHAR(100) NOT NULL,
    birthday DATE,
    location VARCHAR(300),
    registerTag BOOLEAN,
    privateTag BOOLEAN,
    backgroundPath VARCHAR(300),
    PRIMARY KEY (username));

CREATE TABLE flora.ownedPlants(
    id int SERIAL DEFAULT VALUE,
    owner VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    lastWatered DATETIME NOT NULL, -- If Date 0/0/0, Never Watered
    insideTag BOOLEAN NOT NULL,
    todaysTasks VARCHAR(300),
    specificPhoto VARCHAR(300),
    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES users(username),
    FOREIGN KEY (name) REFERENCES plants(name)
);

CREATE TABLE flora.forum(
    topic VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,
    PRIMARY KEY (topic)
);

CREATE TABLE flora.plantPost(
    postId INT SERIAL DEFAULT VALUE,
    topic VARCHAR(100) NOT NULL,
    poster VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    post VARCHAR(240) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    PRIMARY KEY (postId),
    FOREIGN KEY(poster) REFERENCES users(username),
    FOREIGN KEY (topic) REFERENCES forum(topic)
);


CREATE TABLE flora.comment(
    commentId INT SERIAL DEFAULT VALUE,
    postId INT NOT NULL,
    commentAuthor VARCHAR(100) NOT NULL,
    post VARCHAR(240) NOT NULL,
    replyTo INT,
    rootTag VARCHAR(100) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    PRIMARY KEY (commentId),
    FOREIGN KEY (postId) REFERENCES plantPost(postId),
    FOREIGN KEY (commentAuthor) REFERENCES users(username),
    FOREIGN KEY (replyTo) REFERENCES comment(commentId)
);

CREATE TABLE flora.wishTicket(
    ticketId INT SERIAL DEFAULT VALUE,
    username VARCHAR(30) NOT NULL,
    plant VARCHAR(30) NOT NULL,
    PRIMARY KEY (ticketId),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY(plant) REFERENCES plants(name)
);

CREATE TABLE flora.like(
    commentId INT,
    postId INT,
    user VARCHAR(100) NOT NULL,
    FOREIGN KEY (commentId) REFERENCES comment(commentId),
    FOREIGN KEY(postId) REFERENCES plantPost(postId),
    FOREIGN KEY(user) REFERENCES users(username)
);
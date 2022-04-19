-- Create Database Flora
CREATE DATABASE flora;

-- Use Database
USE flora;

CREATE TABLE flora.plants (
    name VARCHAR(100) PRIMARY KEY,
    description VARCHAR(300),
    category VARCHAR(100),
    climate VARCHAR(100),
    imagePath VARCHAR(300)
);

CREATE TABLE flora.location (
    cityName VARCHAR(100) PRIMARY KEY,
    tempLow FLOAT,
    tempHigh FLOAT,
    lastUpdate DATETIME,
    weatherType VARCHAR(100),
    nearestStore VARCHAR(100)
);

CREATE TABLE flora.users (
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    birthday DATE,
    location VARCHAR(300),
    registerTag BOOLEAN,
    privateTag BOOLEAN,
    imagePath VARCHAR(500),
    backgroundPath VARCHAR(300)
);

CREATE TABLE flora.ownedPlants (
    id INTEGER PRIMARY KEY auto_increment,
    owner VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    lastWatered DATETIME,
    insideTag BOOLEAN,
    currentTasks VARCHAR(300),
    specificPhoto VARCHAR(300),
    FOREIGN KEY (owner) REFERENCES users(username),
    FOREIGN KEY (name) REFERENCES plants(name)
);

CREATE TABLE flora.forum (
    topic VARCHAR(100) PRIMARY KEY,
    description VARCHAR(300) NOT NULL
);

CREATE TABLE flora.plantPost (
    postId INTEGER PRIMARY KEY auto_increment,
    topic VARCHAR(100) NOT NULL,
    poster VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    post VARCHAR(240) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    FOREIGN KEY(poster) REFERENCES users(username),
    FOREIGN KEY (topic) REFERENCES forum(topic)
);


CREATE TABLE flora.comment (
    commentId INTEGER PRIMARY KEY auto_increment,
    postId INTEGER NOT NULL,
    commentAuthor VARCHAR(100) NOT NULL,
    post VARCHAR(240) NOT NULL,
    replyTo INTEGER,
    rootTag VARCHAR(100) NOT NULL,
    privateTag BOOLEAN NOT NULL,
    FOREIGN KEY (postId) REFERENCES plantPost(postId),
    FOREIGN KEY (commentAuthor) REFERENCES users(username),
    FOREIGN KEY (replyTo) REFERENCES comment(commentId)
);

CREATE TABLE flora.wishTicket (
    ticketId INTEGER PRIMARY KEY auto_increment,
    username VARCHAR(30) NOT NULL,
    plant VARCHAR(30) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (plant) REFERENCES plants(name)
);

CREATE TABLE flora.like (
    commentId INTEGER PRIMARY KEY auto_increment,
    postId INTEGER NOT NULL,
    user VARCHAR(100) NOT NULL,
    FOREIGN KEY (commentId) REFERENCES comment(commentId),
    FOREIGN KEY (postId) REFERENCES plantPost(postId),
    FOREIGN KEY (user) REFERENCES users(username)
);

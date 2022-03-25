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





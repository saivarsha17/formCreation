# signinform

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

# Getting Started with Create Nuxt App

## First check NodeJS and MySQL is present in your system , if not install them

## Go to constants.js

Check the MySQL credentials and change according to that.

## mysql -u root -p

Open MySQL CLI

## create database new_test

This creates database new_test

## use new_test;

Go to user.sql table and copy paste the table in MySql CLI . This will create table named user.

## cd signinserver &&  npm i



Installs all dependencies

## node server.js

This runs the server at http://localhost:4001/

## API Documentation

This server has 4 endpoints

## http://localhost:4001/register

This API checks whether already existing entry or not . If not exists,inserts the data else,returns message exists

## http://localhost:4001/signin

This API checks whether credentials are already existing in table . If exists ,checks whether user is verified or not

## http://localhost:4001/verify

This API verifies the input verification token and if expires informs returns the information about that.

## http://localhost:4001/sendcode

This APIS sends verification code to your user mailId with expiration time of token of 5min.


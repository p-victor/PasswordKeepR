PasswordKeepR
=========
LHL midterm Project by : `Victor Poirier`, `Eric Lombardo`, and `Hatem (Ahmed Attia)`

## What is PasswordKeepR?
---
PasswordKeepR is a web app that allow users to share credentials of app services (such as facebook page) between specific members.

## User Stories
---
### User Accounts
* a new `user` can register for an account.
* an `existing user` can login into his account.
* a `user` must enter a valid `email` and `password`; and her/his/their `name`.
* a `user` stays logged in until she/he/they logs out.
### App Credentials
* any `user` can create an "app credentials" : a username and a related password. This user becomes known as "`Owner`" (of the credential).
* an `Owner` may share her/his/their `credentials` with another user who shall be called "`Viewer`".
* an `Owner` may revoke a `Viewer`'s access to her/his/their credential(s).
* an `Owner` may alter or delete her/his/their `credentials`, a `Viewer` can not.
* an `Owner` may have 1 or more `credentials`.
* an `App Credential` may be associated with an "`App`" (e.g. facebook, linkedIn,..)
* an `App Credential` may have a `category` (social, entertainment, Work,..) it is "`uncategorized`" by default.

## Project Setup
### Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- bcrypt 2.0.0
- body-parser 1.19.0
- chalk 2.4.2
- cookie-session 1.4.0
- dotenv 2.0.0
- ejs 2.6.2
- express 4.17.1
- morgan 1.9.1
- node-sass-middleware 0.11.0
- pg 6.4.2
- pg-native 3.0.0

_________________ 
## Database 

### Tables 
Our Database contains 5 tables: 

| Tables          | description
| ----------------|:-----------
| users           | all user account informations on the webapp, some are "owners" and some are "viewers" [of a credential]
| categories      | contains the categories of app_credentials
| app_list        | list of apps with which a app_credentials is associated.
| app_credentials | these are the credentials (username/password) entity that are being shared accross users for a certain app.
| shared_access   | a middle/bridge table to associate app_credentials to other users, refered to as "viewers".
|

### Database ERD 
![Database ERD](/assets/images/philly-magic-gardens.jpg "Database ERD")
Github link of this image shall be here 



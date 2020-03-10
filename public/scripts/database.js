const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool(require('../../lib/db.js'));

//# user created an account : name, email, password, add phone (optional)
//# user can reset password of account
//# user can delete account
//# user can see app_credentials:
// 	by owner/viewer
// 	by app, (for query) XX
// ------
//# user/owner adds app_credentials : username, password and app. set editable
//# user/owner can reset app_credentials password
//# user/owner can delete app_credentials (remove row)
//# user/owner can view app_credentials owned by him.
// ------
//# by default: category is uncategorized (0)
//# user/owner can set category
//# user/owner can change category
//# user/owner can remove category / = uncategorized
// user/owner can share or unshare an app_credentials (can_edit) => can view
// ------
// user/viewer CAN view the app_credentials : shared to him.

// user/viewer, cannot edit, create or delete category.(which he doesn't own)
// user/viewer, cannot edit, create or delete app_credentails (which he doesn't own)

// Non DB

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getUserByEmail = function(email) {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
    ;
  `;
const values = [
  `${email}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
}
exports.getUserByEmail = getUserByEmail;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// {name, email, password, phone }
const createUserAccount = function (userDataObj) {
  const query = `
    INSERT INTO users (name, email, password, phone)
    VALUES ($1, $2, $3, $4)
    ;
  `;
  const values = [
    `${userDataObj.name}`,
    `${userDataObj.email}`,
    `${userDataObj.password}`,
    `${userDataObj.phone}`
    ];
  return pool.query(query, values)
  .then(res => {
    console.log(res.rows)
    return res.rows});
};
exports.createUserAccount = createUserAccount;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const updateUserAccount = function(userAccountId, columnName, columnValue) {
  // columnName can be of the following values:
  // 'name', 'email', 'password', or 'phone'
  const query = `
    UPDATE users
    SET
    $2 = $3
    WHERE id = $1
    ;
  `;
const values = [
  `${userAccountId}`,
  `${columnName}`,
  `${columnValue}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
};
exports.updateUserAccount = updateUserAccount;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const deleteUserAccount = function(userAccountId) {
  const query = `
    DELETE FROM users
    WHERE id = $1
    ;
  `;
const values = [
  `${userAccountId}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
}
exports.deleteUserAccount = deleteUserAccount;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const createAppCredential = function(userDataObj, appCredentialsObj, appObj, categoryObj) {
  const query = `
    INSERT INTO app_credentials(username, password, owner_id, app_id, category_id)
    VALUES
    ($1, $2, $3, $4, $5)
  ;
`;
const values = [
  `${appCredentialsObj.username}`,
  `${appCredentialsObj.password}`,
  `${userDataObj.id}`,
  `${appObj.id}`,
  `${categoryObj.id}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
};
exports.createAppCredential = createAppCredential;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getAppCredentialById = function(AppCredentialObj) {
  const query = `
    SELECT *
    FROM app_credentials
    WHERE id = $1
  ;
`;
const values = [
  `${AppCredentialObj.id}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
};
exports.getAppCredentialById = getAppCredentialById;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const updateAppCredentialById = function (appCredentialId, columnName, columnValue) {
  // INPUT columnName MUST BE an actual column name:
  // username, password, owner_id, app_id, category_id, last_password_reset
  // Hatem does not this this is good practice
  const query = `
    INSERT INTO app_credentials ($2)
    VALUES
    ($3)
    WHERE id = $1
  ;
`;
const values = [
  `${appCredentialId}`,
  `${columnName}`,
  `${columnValue}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
};
exports.updateAppCredentialById = updateAppCredentialById;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const deleteAppCredential = function (credentialId) {
  const query = `
    DELETE FROM app_credentials
    WHERE id = $1
  ;
`;
const values = [
  `${credentialId}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
};
exports.deleteAppCredential = deleteAppCredential;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getAppCredentialbyViewerEmail = function(viewerEmail) {
  const query = `
    SELECT *
    FROM users
    JOIN shared_access
    ON users.id = shared_access.user_id
    JOIN app_credentials
    ON app_credentials.id = shared_access.credential_id
    WHERE shared_access.user_id = $1
  ;
`;
const values = [
  `${email}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});

};
exports.getAppCredentialbyViewerEmail = getAppCredentialbyViewerEmail;

/* const getAppCredentialForUser = function (userId) {
  const query = `

  ;
`;
const values = [
  `${}`,
  `${}`,
  `${}`,
   `${}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
};
exports.getAppCredentialForUser = getAppCredentialForUSer; */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * *  DO NOT DELETE  * * * * * * * * * * */

// the following is the inner-template for adding more database fetching functions in the future

/*
  const query = `

    ;
  `;
const values = [
  `${}`,
  `${}`,
  `${}`,
   `${}`
  ];
return pool.query(query, values)
.then(res => {
  console.log(res.rows)
  return res.rows});
*/

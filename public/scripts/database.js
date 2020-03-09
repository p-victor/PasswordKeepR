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
//# user/owner can reset app_credentails password
//# user/owner can delete app_credentails (remove row)
//# user/owner can view app_credentails owned by him.
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

// {name, email, password, phone }
const addUser = function (userInfo) {
};
exports.addUser = addUser;

const createAppCredential = function(userId) {
};
exports.createAppCredential = createAppCredential;

const getAppCredential = function(userId) {
};
exports.getAppCredential = getAppCredential;

const updateAppCredential = function (credentialId, columnName, value) {
};
exports.updateAppCredential = updateAppCredential;

const deleteAppCredential = function (credentialId) {
};
exports.deleteAppCredential = deleteAppCredential;


const getAppCredentialForUser = function (userId) {
};
exports.getAppCredentialForUser = getAppCredentialForUSer;



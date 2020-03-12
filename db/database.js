const { Pool } = require('pg');
const pool = new Pool(require('../lib/db.js'));

pool.connect();

const logQueries = false;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const createAppCredentialForViewer = function (AppCredentialId_var, ViewerName_var) {
  const query = `
    INSERT INTO shared_access (credential_id, user_id)
    VALUES ($1, $2)
  ;
`;
const values = [
`${AppCredentialId_var}`,
`${ViewerName_var}`
];
return pool.query(query, values)
.then(res => {
logQueries  ? console.log(res.rows) : null;
return res.rows});
};
exports.createAppCredentialForViewer = createAppCredentialForViewer;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const AllsharedByAppCredential = function(AppCredentialId_var) {

  const query = `
  SELECT
  users.id AS viewer_id,
  users.name AS viewer_name
  FROM users
  JOIN shared_access ON shared_access.user_id = users.id
  WHERE shared_access.credential_id = $1
  ;
  `;
  const values = [
    `${AppCredentialId_var}`
  ];
  return pool.query(query, values)
  .then(res => {
    logQueries  ? console.log(res.rows) : null;
    return res.rows});
  };
  exports.AllsharedByAppCredential = AllsharedByAppCredential;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const revokeAccessOfOneViewerByCredentialId = function(AppCredentialId, viewerName) {
  const query = `
  DELETE FROM shared_access
  WHERE shared_access.credential_id = $1
  AND shared_access.user_id = (
    SELECT id
    FROM users
    WHERE name = $2
  )
  ;
  `;

const values = [
`${AppCredentialId}`,
`${viewerName}`
];
return pool.query(query, values)
.then(res => {
logQueries  ? console.log(res.rows) : null;
return res.rows});
}
exports.revokeAccessOfOneViewerByCredentialId = revokeAccessOfOneViewerByCredentialId;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const findAppById = function(appId_var) {
  const query = `
    SELECT *
    FROM app_list
    WHERE app_list.id = $1
  ;
`;
const values = [
`${appId_var}`
];
return pool.query(query, values)
.then(res => {
logQueries  ? console.log(res.rows) : null;
return res.rows});
}
exports.findAppById = findAppById;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Searches table App_list : will return the value if found
// use Truthy (value) or falsy (undefined) as your true or false.
const findApp = function(strippedDomain_var) {
  const query = `
      SELECT *
      FROM app_list
      WHERE name = $1
  ;
`;
const values = [
`${strippedDomain_var}`
];
return pool.query(query, values)
.then(res => {
logQueries  ? console.log(res.rows) : null;
return res.rows});
};
exports.findApp = findApp;



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// This function does not support inserting a app_list.photo_url
const createApp = function(strippedDomain_var, stringURL) {
  const query = `
  INSERT INTO app_list (name, domain)
  VALUES ($1, $2)
  RETURNING *
  ;
`;
const values = [
`${strippedDomain_var}`,
`${stringURL}`
];
return pool.query(query, values)
.then(res => {
logQueries  ? console.log(res.rows) : null;
return res.rows});
};
exports.createApp = createApp;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getAllCategories= function(/*no input*/) {
  const query = `
      SELECT *
      FROM categories
    ;
  `;

return pool.query(query)
.then(res => {
  logQueries  ? console.log(res.rows) : null;
  return res.rows});
}
exports.getAllCategories = getAllCategories;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getAppCredentialsbyOwnerId = function(ownerId_var) {
  const query = `
    SELECT
    app_credentials.*,
    app_list.name AS app_list_name
    FROM app_credentials
    JOIN app_list ON app_list.id = app_credentials.app_id
    WHERE app_credentials.owner_id = $1
  ;
`;
const values = [
`${ownerId_var}`
];
return pool.query(query, values)
.then(res => {
logQueries  ? console.log(res.rows) : null;
return res.rows});
}
exports.getAppCredentialsbyOwnerId = getAppCredentialsbyOwnerId;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getAppCredentialsbyViewerId = function(viewerId_var) {
  const query = `
    SELECT
    shared_access.id AS shared_access_id,
    shared_access.user_id AS shared_access_viewer_id,
    users.name AS user_name,
    shared_access.credential_id AS shared_access_credential_id,
    app_credentials.username AS app_credentials_username,
    app_credentials.password AS app_credentials_password,
    app_list.name AS app_list_name,
    app_list.domain AS app_list_domain
    FROM shared_access
    JOIN users ON shared_access.user_id = users.id
    JOIN app_credentials ON shared_access.credential_id = app_credentials.id
    JOIN app_list ON app_list.id = app_credentials.app_id

    WHERE shared_access.user_id = $1
  ;
`;
const values = [
`${viewerId_var}`
];
return pool.query(query, values)
.then(res => {
logQueries  ? console.log(res.rows) : null;
return res.rows});
}
exports.getAppCredentialsbyViewerId = getAppCredentialsbyViewerId;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getUserByName = function(name) {
  const query = `
    SELECT *
    FROM users
    WHERE name = $1
    ;
  `;
const values = [
  `${name}`
  ];
return pool.query(query, values)
.then(res => {
  logQueries  ? console.log(res.rows) : null;
  return res.rows});
}
exports.getUserByName = getUserByName;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getUserById = function(id) {
  const query = `
    SELECT *
    FROM users
    WHERE id = $1
    ;
  `;
const values = [
  `${id}`
  ];
return pool.query(query, values)
.then(res => {
  logQueries  ? console.log(res.rows) : null;
  return res.rows});
}
exports.getUserById = getUserById;

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
  logQueries  ? console.log(res.rows) : null;
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
    logQueries  ? console.log(res.rows) : null;
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
  logQueries  ? console.log(res.rows) : null;
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
  logQueries  ? console.log(res.rows) : null;
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
  logQueries  ? console.log(res.rows) : null;
  return res.rows});
};
exports.createAppCredential = createAppCredential;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getAppCredentialById = function(AppCredentialObj) {
  const query = `
    SELECT app_credentials.*, app_list.name AS app_list_name
    FROM app_credentials
    JOIN app_list ON app_list.id = app_credentials.app_id
    WHERE app_credentials.id = $1
  ;
`;
const values = [
  `${AppCredentialObj.id}`
  ];
return pool.query(query, values)
.then(res => {
  logQueries  ? console.log(res.rows) : null;
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
  logQueries  ? console.log(res.rows) : null;
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
  logQueries  ? console.log(res.rows) : null;
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
  `${viewerEmail}`
  ];
return pool.query(query, values)
.then(res => {
  logQueries  ? console.log(res.rows) : null;
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
  logQueries  ? console.log(res.rows) : null;
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
  logQueries  ? console.log(res.rows) : null;
  return res.rows});
*/

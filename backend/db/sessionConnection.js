const { AppDataSource } = require('../data-source');
const mysql = require('mysql2');

const { host, port, username, database, password } = AppDataSource.options;
//console.log(123, host, port, username, password);
const params = {
  username: 'blogger',
  user: username,
  host: '127.0.0.1',
  database: 'blog',
  password: 'REgfvrwgf3',
  port: 3306,
  max: 10,
};

function createConnection() {
  return new mysql.createPool(params);
}

function sessionConnection() {
  let con = mysql.createConnection(params);

  //con.query('select * from session').then((res) => console.log(res));
  /* con.on('error', function (err) {
    console.log('cannot connect session', err);
  });
  */
  return con.promise();
}

module.exports = { createConnection, sessionConnection };

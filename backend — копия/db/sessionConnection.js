const { AppDataSource } = require('../data-source');
var pg = require('pg');
const { connect } = require('http2');
const { use } = require('passport');

const { host, port, username, database, password } = AppDataSource.options;
//console.log(123, host, port, username, password);
const params = {
  username,
  user: username,
  host,
  database,
  password,
  port,
  max: 10,
};

function createConnection() {
  return new pg.Pool();
}

function sessionConnection() {
  let con = new pg.Pool(params);

  //con.query('select * from session').then((res) => console.log(res));

  con.on('error', function (err) {
    console.log('cannot connect session', err);
  });

  return con;
}

module.exports = { createConnection, sessionConnection };

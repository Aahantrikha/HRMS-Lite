const Datastore = require('@seald-io/nedb');
const path = require('path');

// Create file-based databases
const db = {
  employees: new Datastore({ filename: path.join(__dirname, 'data/employees.db'), autoload: true }),
  attendance: new Datastore({ filename: path.join(__dirname, 'data/attendance.db'), autoload: true })
};

console.log("Local database initialized ✅");

module.exports = db;

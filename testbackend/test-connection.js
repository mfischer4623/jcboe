// test-connection.js
const { Connection, Request } = require('tedious');

// Create connection to database
const config = {
  server: '10.0.0.42', // Your database server
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'JCBOE456'
    }
  },
  options: {
    database: 'as400data',
    port: 1433,
    // Set encrypt to false, as we determined your server doesn't force it
    encrypt: false
  }
};

const connection = new Connection(config);

// Attempt to connect
connection.on('connect', function(err) {
  if (err) {
    console.error('Connection Failed:', err);
  } else {
    console.log('✅ Connection successful!');
    executeStatement();
  }
});

connection.connect();

function executeStatement() {
  const request = new Request("SELECT @@VERSION", function(err) {
    if (err) {
      console.error('SQL Request Failed:', err);
    }
    connection.close();
  });

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log("Database Version:", column.value);
      }
    });
  });

  connection.execSql(request);
}
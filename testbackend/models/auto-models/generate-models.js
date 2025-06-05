const SequelizeAuto = require('sequelize-auto');
const path = require('path');
const options = {
  dialect: 'mssql', // Replace with your database dialect (e.g., mysql, postgres, etc.)
  host: '10.0.0.42',
  port: '1433', // Replace with your database port
  database: 'as400data', // Replace with your database name
  username: 'sa', // Replace with your database username
  password: 'JCBOE456', // Replace with your database password
  directory: path.resolve(__dirname, './'), // Replace with the desired output directory for models
  additional: {
    timestamps: false, // Additional options for model generation (e.g., timestamps, underscored, etc.)
    underscored: true
  }
};
const auto = new SequelizeAuto(null, null, null, options);
auto.run(function (err) {
  if (err) throw err;
  console.log(auto.tables); // List of generated tables
});
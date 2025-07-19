// In /app/config/db.config.s3data.js
module.exports = {
  host: "10.0.0.42", // e.g., "10.0.0.42"
  port: "1433",
  username: "sa",
  password: "JCBOE456",
  database: "s3data",
  dialect: "mssql",

  // Add this entire section to handle encryption
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true // Important for connecting via IP/self-signed certs
    }
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
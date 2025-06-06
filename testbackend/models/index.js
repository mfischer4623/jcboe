const Sequelize = require("sequelize");
const dbConfig = require("../app/config/db.config.js");

// This line can be removed now that we've found the issue, but it's fine to leave.
console.log(">>> Configuration loaded by models/index.js:", dbConfig.HOST, dbConfig.dialect);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("../models/employee.model.js")(sequelize, Sequelize);
db.ppay802s = require("../models/ppay802s.model.js")(sequelize, Sequelize);
db.ppai719as = require("../models/ppai719as.model.js")(sequelize, Sequelize);
db.peis480ds = require("../models/peis480ds.model.js")(sequelize, Sequelize);
db.certificates = require("../models/certificates.model.js")(sequelize, Sequelize);
db.salaries = require("../models/salaries.model.js")(sequelize, Sequelize);
db.ppay3403s = require("../models/ppay3403s.model.js")(sequelize, Sequelize);
db.peis480hs = require("../models/peis480hs.model.js")(sequelize, Sequelize);
db.ppai712s = require("../models/ppai712s.model.js")(sequelize, Sequelize);
db.ppai713s = require("../models/ppai713s.model.js")(sequelize, Sequelize);
db.ppai715s = require("../models/ppai715s.model.js")(sequelize, Sequelize);
db.ppay121s = require("../models/ppay121s.model.js")(sequelize, Sequelize);
db.ppay122s = require("../models/ppay122s.model.js")(sequelize, Sequelize);
db.ppay125s = require("../models/ppay125s.model.js")(sequelize, Sequelize);
db.ppay124s = require("../models/ppay124s.model.js")(sequelize, Sequelize);
db.ppay127s = require("../models/ppay127s.model.js")(sequelize, Sequelize);
db.pfrs860s = require("../models/pfrs860s.model.js")(sequelize, Sequelize);
db.purchaseOrders = require("../models/purchaseOrders.model.js")(sequelize, Sequelize);
db.ppur301s = require("../models/ppur301s.model.js")(sequelize, Sequelize);
db.lacp441s = require("../models/lacp441s.model.js")(sequelize, Sequelize);
db.s3000checkReports = require("../models/s3000checkReports.model.js")(sequelize, Sequelize);
db.s3000payOutput = require("../models/s3000payOutput.model.js")(sequelize, Sequelize);
db.users = require("../app/models/users.model.js")(sequelize, Sequelize);
module.exports = db;
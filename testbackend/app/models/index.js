const Sequelize = require("sequelize");
const dbConfig = require("../app/config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: "db2"
  // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle,
  // },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("../app/models/employee.model.js")(sequelize, Sequelize);
db.ppay802s = require("../app/models/ppay802s.model.js")(sequelize, Sequelize);
db.ppai719as = require("../app/models/ppai719as.model.js")(sequelize, Sequelize);
db.peis480ds = require("../app/models/peis480ds.model.js")(sequelize, Sequelize);
db.certificates = require("../app/models/certificates.model.js")(sequelize, Sequelize);
db.salaries = require("../app/models/salaries.model.js")(sequelize, Sequelize);
db.ppay3403s = require("../app/models/ppay3403s.model.js")(sequelize, Sequelize);
db.peis480hs = require("../app/models/peis480hs.model.js")(sequelize, Sequelize);
db.ppai712s = require("../app/models/ppai712s.model.js")(sequelize, Sequelize);
db.ppai713s = require("../app/models/ppai713s.model.js")(sequelize, Sequelize);
db.ppai715s = require("../app/models/ppai715s.model.js")(sequelize, Sequelize);
db.ppay121s = require("../app/models/ppay121s.model.js")(sequelize, Sequelize);
db.ppay122s = require("../app/models/ppay122s.model.js")(sequelize, Sequelize);
db.ppay125s = require("../app/models/ppay125s.model.js")(sequelize, Sequelize);
db.ppay124s = require("../app/models/ppay124s.model.js")(sequelize, Sequelize);
db.ppay127s = require("../app/models/ppay127s.model.js")(sequelize, Sequelize);
db.pfrs860s = require("../app/models/pfrs860s.model.js")(sequelize, Sequelize);
db.purchaseOrders = require("../app/models/purchaseOrders.model.js")(sequelize, Sequelize);
db.ppur301s = require("../app/models/ppur301s.model.js")(sequelize, Sequelize);
db.lacp441s = require("../app/models/lacp441s.model.js")(sequelize, Sequelize);
db.users = require("../app/models/users.model.js")(sequelize, Sequelize);
db.ppur410lxs = require("../app/models/ppur410lxs.model.js")(sequelize, Sequelize);


db.s3000checkReports = require("../app/models/s3000checkReports.model.js")(sequelize, Sequelize);
db.s3000payOutput = require("../app/models/s3000payOutput.model.js")(sequelize, Sequelize);

module.exports = db;
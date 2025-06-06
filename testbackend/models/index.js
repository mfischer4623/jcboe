const Sequelize = require("sequelize");
const dbConfig = require("../app/config/db.config.js");

const sequelize = new Sequelize("testdb", "db2inst1", "db2inst1", {
  host: "localhost",
  port: "50000",
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

db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.ppay802s = require("./ppay802s.model.js")(sequelize, Sequelize);
db.ppai719as = require("./ppai719as.model.js")(sequelize, Sequelize);
db.peis480ds = require("./peis480ds.model.js")(sequelize, Sequelize);
db.certificates = require("./certificates.model.js")(sequelize, Sequelize);
db.salaries = require("./salaries.model.js")(sequelize, Sequelize);
db.ppay3403s = require("./ppay3403s.model.js")(sequelize, Sequelize);
db.peis480hs = require("./peis480hs.model.js")(sequelize, Sequelize);
db.ppai712s = require("./ppai712s.model.js")(sequelize, Sequelize);
db.ppai713s = require("./ppai713s.model.js")(sequelize, Sequelize);
db.ppai715s = require("./ppai715s.model.js")(sequelize, Sequelize);
db.ppay121s = require("./ppay121s.model.js")(sequelize, Sequelize);
db.ppay122s = require("./ppay122s.model.js")(sequelize, Sequelize);
db.ppay125s = require("./ppay125s.model.js")(sequelize, Sequelize);
db.ppay124s = require("./ppay124s.model.js")(sequelize, Sequelize);
db.ppay127s = require("./ppay127s.model.js")(sequelize, Sequelize);
db.pfrs860s = require("./pfrs860s.model.js")(sequelize, Sequelize);
db.purchaseOrders = require("./purchaseOrders.model.js")(sequelize, Sequelize);
db.ppur301s = require("./ppur301s.model.js")(sequelize, Sequelize);
db.lacp441s = require("./lacp441s.model.js")(sequelize, Sequelize);
db.s3000checkReports = require("./s3000checkReports.model.js")(sequelize, Sequelize);
db.s3000payOutput = require("./s3000payOutput.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
module.exports = db;
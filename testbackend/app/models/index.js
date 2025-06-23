const Sequelize = require("sequelize");
// This path is wrong, it should be relative from app/models up to app/config
const dbConfig = require("../config/db.config.js"); 

// This constructor call is now likely incorrect because Sequelize v6+
// prefers separate arguments over a single config object unless using a connection URI.
// Let's stick to the more explicit and compatible way.
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// CORRECTED PATHS: All paths should start with './' because they are in the same directory.
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
db.ppur410lxs = require("./ppur410lxs.model.js")(sequelize, Sequelize); 

module.exports = db;
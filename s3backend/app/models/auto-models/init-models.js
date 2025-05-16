var DataTypes = require("sequelize").DataTypes;
var _CR-Staging-2016-1 = require("./CR-Staging-2016-1");
var _CR-Staging-2017-1 = require("./CR-Staging-2017-1");
var _CR-Staging-2018-1 = require("./CR-Staging-2018-1");
var _CR-Staging-2019-1 = require("./CR-Staging-2019-1");
var _CR-Staging-2020-1 = require("./CR-Staging-2020-1");
var _CR-Staging-2021-1 = require("./CR-Staging-2021-1");
var _CR-Staging-2022-1 = require("./CR-Staging-2022-1");
var _CR-Staging-2023-1 = require("./CR-Staging-2023-1");
var _CR-Staging-2024-1 = require("./CR-Staging-2024-1");
var _CR-Staging-2025-1 = require("./CR-Staging-2025-1");
var _CheckRegister-2024 = require("./CheckRegister-2024");
var _Emp-PayOutput = require("./Emp-PayOutput");
var _S3-ProfileReport-Mar2025 = require("./S3-ProfileReport-Mar2025");
var _S3_ratebase2017 = require("./S3_ratebase2017");
var _S3_ratebase2018 = require("./S3_ratebase2018");
var _S3_ratebase2019 = require("./S3_ratebase2019");
var _S3_ratebase2020 = require("./S3_ratebase2020");
var _S3_ratebase2021 = require("./S3_ratebase2021");
var _S3_ratebase2022 = require("./S3_ratebase2022");
var _S3_ratebase2023 = require("./S3_ratebase2023");

function initModels(sequelize) {
  var CR-Staging-2016-1 = _CR-Staging-2016-1(sequelize, DataTypes);
  var CR-Staging-2017-1 = _CR-Staging-2017-1(sequelize, DataTypes);
  var CR-Staging-2018-1 = _CR-Staging-2018-1(sequelize, DataTypes);
  var CR-Staging-2019-1 = _CR-Staging-2019-1(sequelize, DataTypes);
  var CR-Staging-2020-1 = _CR-Staging-2020-1(sequelize, DataTypes);
  var CR-Staging-2021-1 = _CR-Staging-2021-1(sequelize, DataTypes);
  var CR-Staging-2022-1 = _CR-Staging-2022-1(sequelize, DataTypes);
  var CR-Staging-2023-1 = _CR-Staging-2023-1(sequelize, DataTypes);
  var CR-Staging-2024-1 = _CR-Staging-2024-1(sequelize, DataTypes);
  var CR-Staging-2025-1 = _CR-Staging-2025-1(sequelize, DataTypes);
  var CheckRegister-2024 = _CheckRegister-2024(sequelize, DataTypes);
  var Emp-PayOutput = _Emp-PayOutput(sequelize, DataTypes);
  var S3-ProfileReport-Mar2025 = _S3-ProfileReport-Mar2025(sequelize, DataTypes);
  var S3_ratebase2017 = _S3_ratebase2017(sequelize, DataTypes);
  var S3_ratebase2018 = _S3_ratebase2018(sequelize, DataTypes);
  var S3_ratebase2019 = _S3_ratebase2019(sequelize, DataTypes);
  var S3_ratebase2020 = _S3_ratebase2020(sequelize, DataTypes);
  var S3_ratebase2021 = _S3_ratebase2021(sequelize, DataTypes);
  var S3_ratebase2022 = _S3_ratebase2022(sequelize, DataTypes);
  var S3_ratebase2023 = _S3_ratebase2023(sequelize, DataTypes);


  return {
    CR-Staging-2016-1,
    CR-Staging-2017-1,
    CR-Staging-2018-1,
    CR-Staging-2019-1,
    CR-Staging-2020-1,
    CR-Staging-2021-1,
    CR-Staging-2022-1,
    CR-Staging-2023-1,
    CR-Staging-2024-1,
    CR-Staging-2025-1,
    CheckRegister-2024,
    Emp-PayOutput,
    S3-ProfileReport-Mar2025,
    S3_ratebase2017,
    S3_ratebase2018,
    S3_ratebase2019,
    S3_ratebase2020,
    S3_ratebase2021,
    S3_ratebase2022,
    S3_ratebase2023,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

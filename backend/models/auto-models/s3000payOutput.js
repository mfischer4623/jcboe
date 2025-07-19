const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s3000payOutput', {
    emp_num: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    middleini: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    suffix: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dept: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    hispanic: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    native_am: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    asian: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    african_am: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    pacisl_haw: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    white: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    smid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    location: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    hiredate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    termdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastsaldte: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    abs_stat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    birthdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    active: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    account1: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    scname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jtcode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    workdays: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    long: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    salary: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rate: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    rateunit: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    hours: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ed_code: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 's3000payOutput',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};

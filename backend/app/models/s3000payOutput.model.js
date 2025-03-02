module.exports = (sequelize, Sequelize) => {
  const S3000payOutput = sequelize.define("s3000payOutput", {
    emp_num: {
      type: Sequelize.SMALLINT,
      allowNull: true
    },
    firstname: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    middleini: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    lastname: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    address1: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    address2: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    city: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    state: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    zip: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    suffix: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dept: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    hispanic: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    native_am: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    asian: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    african_am: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    pacisl_haw: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    white: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    smid: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    location: {
      type: Sequelize.SMALLINT,
      allowNull: true
    },
    hiredate: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    termdate: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    lastsaldte: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    abs_stat: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    birthdate: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    active: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    phone: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    phone2: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    account1: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    scname: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    jtcode: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    mode: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    workdays: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    long: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    salary: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    rate: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    rateunit: {
      type: Sequelize.STRING(1),
      allowNull: true
    },
    hours: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    ed_code: {
      type: Sequelize.SMALLINT,
      allowNull: true
    }
  });
 
    return S3000payOutput;
  };

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY370', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ADAT: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    RETN: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    SESN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CM: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ENCSSN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ENCJOB: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ENCACT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ENCFND: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ENCDES: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ENCAMT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ENCADJ: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ENCDIS: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ENCSDT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ENCLDT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ENCLCK: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ENCLUR: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ENCLCS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ENCCNT: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ENCOPN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PPAY370',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};

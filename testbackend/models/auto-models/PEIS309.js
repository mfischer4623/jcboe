const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PEIS309', {
    CTSSN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CTID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CTTYPE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CTRANK: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CTLEVL: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CTVCEN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CTVDAT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CTECEN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CTEDAT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CTICEN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CTIDAT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CTRCEN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CTRDAT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CTVRCN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CTVRDT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CTUSG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CTBUSY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PEIS309',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};

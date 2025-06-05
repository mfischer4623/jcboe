const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY995', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOCYR: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOCPL1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    HOFDT1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOTDT1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOODT1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOOTM1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOUSR1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    HOSPC1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOR011: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR021: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR031: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR041: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR051: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HOR061: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR071: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HOR081: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR091: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR101: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR111: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR121: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR131: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR141: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR151: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR161: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOCPL2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    HOFDT2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOTDT2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOODT2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOOTM2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HOUSR2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    HOSPC2: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR012: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR022: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR032: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR042: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR052: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HOR062: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR072: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HOR082: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR092: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR102: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR112: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR122: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR132: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR142: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR152: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR162: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOCPL3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    HOFDT3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOTDT3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOODT3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOOTM3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOUSR3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    HOSPC3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR013: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR023: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR033: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR043: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR053: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR063: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR073: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR083: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR093: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR103: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR113: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR123: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR133: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR143: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR153: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    HOR163: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PPAY995',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};

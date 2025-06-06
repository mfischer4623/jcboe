const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      field: 'ID', // <-- match exact DB2 column
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      field: 'USERNAME',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      field: 'EMAIL',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      field: 'PASSWORD',
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      field: 'STATUS',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    access: {
      field: 'ACCESS',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    createdAt: {
      field: 'CREATEDAT',
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    updatedAt: {
      field: 'UPDATEDAT',
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PK__users__3213E83FED242544",
        unique: true,
        fields: [
          { name: "ID" } // <-- must match DB2 column
        ]
      },
    ]
  });
};

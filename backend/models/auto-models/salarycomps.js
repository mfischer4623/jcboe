const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salarycomps', {
    ENUM: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SEQNO: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Employee#': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Last Name': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'First Name': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Middle Initial': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Department: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Tenured?': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Tenure Date': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    EM_AVSDATE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Job Title1': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Job Title2': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Calculated Salary': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Calculated?': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'District Experience': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DISTRICT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Job Title3': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Definition: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Year: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'FTE %': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Step: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Active?': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Percentage: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Run Amount': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ESC_HOURS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Mode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Hire Date': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Birth Date': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'State Experience': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Military Experience': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Public Experience': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'Other Experience': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    STEPDESC: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    HOURRATE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    REPORTYEAR: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    JT_WORKDAYS: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'salarycomps',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s3000checkReports', {
    chknum: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    chkdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    chkvdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    chkrun: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    employeenum: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mi: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    emptype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    workingmonth: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    totalpays: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bldglocation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    checklocation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    statuscode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    employmenttype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    refunds: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dockage: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cgwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    taxes: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    deductions: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    netpayadj: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    newwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cnetwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dirdepositamt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    paycode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode5: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc5: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt5: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode6: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc6: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt6: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode7: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc7: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt7: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode8: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc8: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt8: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcode9: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ckdesc9: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    amt9: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cdistrict: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    chkcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    empcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tpafcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    perscnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dcrpnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    othercnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    malecnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    femalecnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    undesigcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nogendcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    singlecnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    marriedcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ftcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ptcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ltsubcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pdsubcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nostatcnt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    trefunds: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tdockage: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tgwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tcgwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ttaxes: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tded: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tnetpayadj: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tnetwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tcnetwages: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tddep: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    empadj: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 's3000checkReports',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};

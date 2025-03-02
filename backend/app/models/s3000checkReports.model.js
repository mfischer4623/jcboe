module.exports = (sequelize, Sequelize) => {
  const S3000checkReports = sequelize.define("s3000checkReports", {
    chknum: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    chkdate: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    chkvdate: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    chkrun: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    status: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    employeenum: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    lname: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    fname: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    mi: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    emptype: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    workingmonth: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    totalpays: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    bldglocation: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    department: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    checklocation: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    statuscode: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    employmenttype: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    refunds: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dockage: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    gwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    cgwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    taxes: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    deductions: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    netpayadj: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    newwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    cnetwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dirdepositamt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    paycode: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode1: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc1: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt1: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode2: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc2: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt2: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode3: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc3: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt3: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode4: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc4: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt4: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode5: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc5: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt5: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode6: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc6: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt6: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode7: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc7: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt7: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode8: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc8: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt8: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcode9: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ckdesc9: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    amt9: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    cdistrict: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    chkcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    empcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tpafcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    perscnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    dcrpnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    othercnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    malecnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    femalecnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    undesigcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    nogendcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    singlecnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    marriedcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ftcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ptcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ltsubcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    pdsubcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    nostatcnt: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    trefunds: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tdockage: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tgwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tcgwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ttaxes: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tded: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tnetpayadj: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tnetwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tcnetwages: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    tddep: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    empadj: {
      type: Sequelize.STRING(50),
      allowNull: true
    }
  });
 
    return S3000checkReports;
  };

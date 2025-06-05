module.exports = (sequelize, Sequelize) => {
  const Peis480hs = sequelize.define("peis480hs", {
    PA: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PATID: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    PADATE: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    PACENT: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },
    PADATA: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    PAUSG: {
      type: Sequelize.STRING(1),
      allowNull: true
    },
    PABUSY: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
  });
 
    return Peis480hs;
  };
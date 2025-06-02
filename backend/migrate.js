const { sequelize } = require('./models');

sequelize.sync({ force: true }) // Warning: Drops all tables!
  .then(() => {
    console.log('Database synchronized');
  });
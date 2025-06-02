const Sequelize = require('sequelize');
const SequelizeAutoMigrations = require('sequelize-auto-migrations');

const sequelize = new Sequelize({
  dialect: 'db2',
  host: 'localhost',
  port: 50000,
  username: 'db2inst1',
  password: 'db2inst1',
  database: 'testdb'
});

const migrator = new SequelizeAutoMigrations(sequelize);

(async () => {
  try {
    await migrator.generate();
    console.log('Migrations generated successfully!');
  } catch (err) {
    console.error('Error generating migrations:', err);
  }
})();
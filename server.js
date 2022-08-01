const express = require('express');
const routes = require('./routes');
// import sequelize connection
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

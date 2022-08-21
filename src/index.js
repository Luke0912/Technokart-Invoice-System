const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

const PORT = config.port;

mongoose
  .connect(config.mongodb_url)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Failed to connect to DataBase', err);
  });

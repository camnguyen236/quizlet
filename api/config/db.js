const mongoose = require('mongoose');

function connect() {
   mongoose
      .connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then(console.log('Connected to mongoDB'))
      .catch((err) => console.log(err));
}

module.exports = { connect };
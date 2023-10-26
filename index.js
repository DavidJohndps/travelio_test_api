const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;
const router = require('./router');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database');

    app.use('/api', router);

    app.listen(PORT, () => {
      console.log(`Running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

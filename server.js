const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api/v1', require('./routes/protected'));
app.use('/api/v1', require('./routes/user'));

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
  }
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});

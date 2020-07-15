import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

import protectedRoute from './routes/protected';
import userRoute from './routes/user';

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

app.use('/api/v1', protectedRoute);
app.use('/api/v1', userRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    app.listen(PORT, () => console.log(`Server is running Port ${PORT}`));
  }
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

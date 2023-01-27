import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from './routes/clientRoutes.js';
import generalRoutes from './routes/generalRoutes.js';
import managementRoutes from './routes/managementRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import User from './models/userModel.js';

import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from './data/index.js';
import ProductStat from './models/productStatModel.js';
import Product from './models/productModel.js';
import Transaction from './models/transactionModel.js';
import OverallStats from './models/overallStatsModel.js';
import AffiliateStat from './models/AffiliateStat.js';
import seedData from './seed.js';

/* CONFIGRATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3005;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    // app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

    //* use to populate mongoDd database
    //? pass (true) to populate data and nothing does nothing
    return seedData();
  })
  .then(() => {
    // run server once data is populated
    app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));

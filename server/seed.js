import {
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from './data/index.js';
import OverallStats from './models/overallStatsModel.js';
import Product from './models/productModel.js';
import ProductStat from './models/productStatModel.js';
import Transaction from './models/transactionModel.js';
import User from './models/userModel.js';

const seedData = async (upload = false) => {
  try {
    if (!upload) return;

    console.log('DELETING DATA');

    await User.deleteMany();
    await ProductStat.deleteMany();
    await Product.deleteMany();
    await Transaction.deleteMany();
    await OverallStats.deleteMany();

    console.log('DATA DELETED');
    console.log('UPLOADING DATA');

    await User.insertMany(dataUser);
    await ProductStat.insertMany(dataProductStat);
    await Product.insertMany(dataProduct);
    await Transaction.insertMany(dataTransaction);
    await OverallStats.insertMany(dataOverallStat);

    console.log('DATA UPlOADED');
  } catch (error) {
    console.log(error);
  }
};

export default seedData;

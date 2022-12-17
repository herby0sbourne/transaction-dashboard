import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Transaction from './../models/transactionModel.js';

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');

    res.status(200).send(admins);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affliateStats',
        },
      },
      { $unwind: '$affliateStats' },
    ]);

    const salesTransactions = await Promise.all(
      userWithStats[0].affliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).send({
      user: userWithStats[0],
      sales: filteredSalesTransactions,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

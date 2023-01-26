import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';
import OverallStats from './../models/overallStatsModel.js';

Transaction;

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded Value
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';

    // Recent transactions
    const transactions = await Transaction.find().limit(50).sort({ createdAt: -1 });

    // Overall Stats
    // const overallStats = await OverallStats.findOne({ year: currentYear });
    const overallStats = await OverallStats.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStats = overallStats[0].monthlyData.find((month) => {
      return month === currentMonth;
    });

    const todayStats = overallStats[0].dailyData.find((day) => {
      return day === currentDay;
    });

    res.status(200).send({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

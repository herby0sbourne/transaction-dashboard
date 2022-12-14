import OverallStats from '../models/overallStatsModel.js';

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStats.find();

    res.status(200).send(overallStats[0]);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

import mongoose from 'mongoose';

const affiliateStatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    affiliateSales: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Transaction',
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model('AffiliateStat', affiliateStatSchema);

export default AffiliateStat;

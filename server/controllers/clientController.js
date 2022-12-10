import Product from '../models/productModel.js';
import ProductStat from '../models/productStatModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, stat };
      })
    );

    res.status(200).send(productsWithStats);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

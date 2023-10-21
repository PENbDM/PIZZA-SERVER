import Pizza from "../models/Pizza.js";
export const getAll = async (req, res) => {
  try {
    const pizza = await Pizza.find({}).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getOnePizza = async (req, res) => {
  try {
    const id = req.params.id;
    const pizza = await Pizza.findOne({ _id: id }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new Pizza({
      id: req.body.id,
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      types: req.body.types,
      sizes: req.body.sizes,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.category,
    });
    const pizza = await doc.save();
    //creating document(pizza)
    res.json(pizza);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not create pizza",
    });
  }
};
//sort by category
export const getPizzaMeat = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaVegan = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 2 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaGreel = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 3 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaSpicy = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 4 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getPizzaClosed = async (req, res) => {
  try {
    const pizza = await Pizza.find({ category: 5 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
//sort by category

//sort by price,popular,alphabet
export const getSortRaiting = async (req, res) => {
  try {
    const pizza = await Pizza.find().sort({ rating: -1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getSortPrice = async (req, res) => {
  try {
    const pizza = await Pizza.find().sort({ price: -1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
export const getSortTitle = async (req, res) => {
  try {
    const pizza = await Pizza.find().sort({ title: -1 }).exec();
    res.json(pizza);
  } catch (err) {
    res.status(500).json({
      message: "Could not get pizzas",
    });
  }
};
//sort by price,popular,alphabet
export const getCategorySort = async (req, res) => {
  const { category, sortBy, page } = req.query;
  const itemsPerPage = 4;
  const skip = (page - 1) * itemsPerPage;

  let query;

  if (category === "0") {
    // Если "category" равно '0', получаем все пиццы без фильтрации по категории
    query = Pizza.find({});
  } else {
    // Иначе, фильтруем по указанной категории
    query = Pizza.find({ category });
  }

  if (sortBy === "0") {
    query = query.sort({ rating: -1 });
  } else if (sortBy === "1") {
    query = query.sort({ price: -1 });
  } else if (sortBy === "2") {
    query = query.sort({ title: 1 });
  }

  try {
    const pizzas = await query.skip(skip).limit(itemsPerPage).exec();
    res.json(pizzas);
  } catch (error) {
    res.status(500).send(error);
  }
};

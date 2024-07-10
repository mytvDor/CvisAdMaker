const { myproduct } = require("../models/productModel");
const { v4: uuidv4 } = require("uuid");

async function generateUniqueId() {
  let id;
  let exists = true;

  while (exists) {
    id = uuidv4();
    exists = await myproduct.exists({ servId: id });
  }

  return id;
}

const uploadProduct = async (req, res) => {
  const uniqueid = await generateUniqueId();
  // const body = req.body;

  await myproduct.create({
    title: req.body.title,

    img: req.body.img,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    servId: uniqueid,
    uid: "coming soon",
    location: "us",
  });

  res.send("product added");
};

const updateProduct = async (req, res) => {
  // const body = req.body;

  try {
    await myproduct.findOneAndUpdate(
      { prodid: req.body.prodid },
      {
        title: req.body.title,
        img: "ss",
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
      }
    );
    res.send("product updated");
  } catch (err) {
    console.log(err);
    res.send("product not updated");
  }
};

const deleteProd = async (req, res) => {
  try {
    await myproduct.findOneAndDelete({ prodid: req.body.prodid });
    res.send("product ddeleted");
  } catch (err) {
    console.log(err);
    res.send("product not deleted");
  }
};

const getProduct = async (req, res) => {
  try {
    const data = await myproduct.find();
    console.log(typeof data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("products not found");
  }
};

const getOneProd = async (req, res) => {
  try {
    const data = await myproduct.findOne({ prodid: req.query.prodid }); // Use req.query instead of req.body

    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("Product not found");
  }
};
module.exports = {
  uploadProduct,
  updateProduct,
  deleteProd,
  getProduct,
  getOneProd,
};

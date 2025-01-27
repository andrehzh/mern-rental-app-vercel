import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
// import products from "./data/products.js";
import items from "./data/items.js";
import User from "./models/userModel.js";
// import Product from "./models/productModel.js";
import Item from "./models/itemModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
   // await Product.deleteMany();
    await User.deleteMany();
    await Item.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    /* const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts); */

    // currently it is adminUser but need to change eventually..
    const sampleItems = items.map((item) => {
      return { ...item, owner: adminUser };
    });

    await Item.insertMany(sampleItems);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
   // await Product.deleteMany();
    await User.deleteMany();
    await Item.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

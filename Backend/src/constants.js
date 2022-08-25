const { config } = require("dotenv");
const path = require("path");

config();

console.log(path.join(__dirname, "Database", "productos.json"));

module.exports = {
  PORT: process.env.PORT || 4000,
  FILENAME_DATABASE: path.join(__dirname, "Database", "productos.json"),
};

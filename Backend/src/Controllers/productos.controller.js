const fs = require("fs");
const { FILENAME_DATABASE } = require("../constants");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      const data = JSON.parse(products);

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      const data = JSON.parse(products);

      const product = data.find((item) => item.id === +id);

      if (!product) throw new Error("No se encontro el producto");

      res.status(200).json({ data: product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createProduct: async (req, res) => {},
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      const data = JSON.parse(products);

      const index = data.findIndex((item) => item.id === +id);

      if (!index) throw new Error(`El producto con ID ${id} no existe`);

      const newProduct = {
        id: +id,
        ...req.body,
      };

      data.splice(index, 1, newProduct);

      await fs.promises.writeFile(
        FILENAME_DATABASE,
        JSON.stringify(data),
        "utf-8"
      );

      res.status(200).json({
        message: `El producto con ID ${id} se actualizo correctamente`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteProduct: async (req, res) => {},
};

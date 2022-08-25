const express = require("express");
const morgan = require("morgan");
const { PORT } = require("./constants");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/API/products", require("./Routes/productos.route"));
//app.use("API/carrito");

app.get("/", (req, res) => {
  res.send("It Works");
});

app.listen(PORT, () => console.log(`Server on Port ${PORT}`));

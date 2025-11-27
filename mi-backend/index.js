// index.js
import express from "express";
import dotenv from "dotenv";
import createProductosRouter from "./routes/products.js";
import { pool } from "./db.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/productos", createProductosRouter(pool));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`corriendo en el puerto${PORT}`));

app.get("/test-db", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT 1 + 1 AS solution");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en conexión a BD" });
    }
  });
  
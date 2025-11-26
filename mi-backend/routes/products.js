import express from "express";
const router = express.Router();

export default (pool) => {

  // 📌 Obtener todos los productos
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM productos");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  });

  // 📌 Agregar un producto
  router.post("/", async (req, res) => {
    try {
      const { nombre, descripcion, precio, stock } = req.body;

      const [result] = await pool.query(
        "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
        [nombre, descripcion || null, precio, stock || 0]
      );

      res.json({ 
        message: "Producto agregado correctamente",
        id: result.insertId 
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al agregar producto" });
    }
  });

  return router;
};

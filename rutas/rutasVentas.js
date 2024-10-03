var rutas = require("express").Router();
var { mostrarVentas, nuevaVenta, cancelarVenta, buscarVentaPorId } = require("../bd/ventasBD");

// Obtener todas las ventas
rutas.get("/", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

// Buscar venta por ID
rutas.get("/buscarPorId/:id", async (req, res) => {
    var ventaValida = await buscarVentaPorId(req.params.id);
    res.json(ventaValida);
});

// Crear una nueva venta
rutas.post("/nuevaVenta", async (req, res) => {
    console.log(req.body);
    var ventaGuardada = await nuevaVenta(req.body);
    res.json(ventaGuardada);
});

// Cancelar una venta
rutas.put("/cancelarVenta/:id", async (req, res) => {
    var ventaCancelada = await cancelarVenta(req.params.id);
    res.json(ventaCancelada);
});

module.exports = rutas;

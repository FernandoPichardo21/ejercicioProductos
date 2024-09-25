var rutas=require("express").Router();
//var {Router}=require("express"); esta linea es la misma que la de arriba y seria Router.get para la ruta

var {mostrarProducto,nuevoProducto,borrarProducto,buscarPorId}=require("../bd/productosBD")

rutas.get("/",async(req,res) =>{
   // res.send("Hola estas en la raiz")
   var productosValidos=await mostrarProducto(); //se usa la variable para reternerla en algun lado
   //console.log(usuariosValidos);
   res.json(productosValidos);  
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
   var productoValido = await buscarPorId(req.params.id);
   res.json(productoValido);
})

rutas.post("/nuevoProducto",async(req,res)=>{
   console.log(req.body);
  var PromedioGuardado = await nuevoProducto(req.body);
  res.json(PromedioGuardado);

});

rutas.delete("/borrarProducto/:id",async(req,res)=>{
   var productoBorrado = await borrarProducto(req.params.id);
   res.json(productoBorrado);
})

module.exports=rutas;
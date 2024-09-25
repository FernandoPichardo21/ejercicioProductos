var rutas=require("express").Router();
//var {Router}=require("express"); esta linea es la misma que la de arriba y seria Router.get para la ruta

var {mostrarUsuarios,nuevoUsuario,borrarUsuario,buscarPorId}=require("../bd/usuariosBD")

rutas.get("/",async(req,res) =>{
   // res.send("Hola estas en la raiz")
   var usuariosValidos=await mostrarUsuarios(); //se usa la variable para reternerla en algun lado
   //console.log(usuariosValidos);
   res.json(usuariosValidos);  
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
   var usuarioValido = await buscarPorId(req.params.id);
   res.json(usuarioValido);
})

rutas.post("/nuevoUsuario",async(req,res)=>{
   console.log(req.body);
  var ususarioGuardado = await nuevoUsuario(req.body);
  res.json(ususarioGuardado);

});

rutas.delete("/borrarUsuario/:id",async(req,res)=>{
   var usuarioBorrado = await borrarUsuario(req.params.id);
   res.json(usuarioBorrado);
})

module.exports=rutas;
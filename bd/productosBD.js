const { productosBD } = require("./conexion");
const Producto = require("../clases/Producto");

function validar(producto) {
    var valido = false;
    if (producto.cantidad != undefined && producto.nombre != undefined && producto.precio != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarProducto() {
    const productos = await productosBD.get();
    productosValidos = [];
    productos.forEach(producto => {
        // console.log(usuario.id);  //.id para mostrar el id y el data() sirve para mostrar los demas datos     
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validar(producto1.datos)) {
            productosValidos.push(producto1.datos);
        }
    });
    return productosValidos;
}
async function buscarPorId(id) {
    var ProductoValido;
    const producto = await productosBD.doc(id).get(); //aqui recuperamos el ide de firebase y lo mandamos a la constante usuario
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    if (validar(producto1.datos)) {
        ProductoValido = producto1.datos;
    }
    //console.log(usuarioValido);
    return ProductoValido;
}

async function nuevoProducto(data) {
   
    const producto1 = new Producto(data);
    var productoValido={};
    var productoGuardado=false;
    
    if (validar(producto1.datos)) {
        productoValido = producto1.datos;
        await productosBD.doc().set(productoValido);
        productoGuardado=true;
    }
    return productoGuardado;

}

async function borrarProducto(id){
    //console.log(await buscarPorId(id));
    var productoBorrado=false;
   if (await buscarPorId(id)!=undefined) {
        await productosBD.doc(id).delete();
        productoBorrado=true;
        
    } 
    return productoBorrado;

}

//borrarUsuario("100");

//mostrarUsuarios();
//buscarPorId("100");
/*
var data = {
    nombre: "Jesus",
    usuario: "fer",
    password: "12345"
}*/

//nuevoUsuario(data);


module.exports={
    mostrarProducto,
    nuevoProducto,
    borrarProducto,
    buscarPorId
}

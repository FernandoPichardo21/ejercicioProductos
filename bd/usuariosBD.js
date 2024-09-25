const { usuariosBD } = require("./Conexion");
const Usuario = require("../clases/Usuario");
const {validarPassword, encriptarPassword}=require("../middlewares/funcionesPassword");

function validar(usuario) {
    var valido = false;
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    usuariosValidos = [];
    usuarios.forEach(usuario => {
        // console.log(usuario.id);  //.id para mostrar el id y el data() sirve para mostrar los demas datos     
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validar(usuario1.datos)) {
            usuariosValidos.push(usuario1.datos)
        }
    });
    return usuariosValidos;
}
async function buscarPorId(id) {
    var usuarioValido;
    const usuario = await usuariosBD.doc(id).get(); //aqui recuperamos el ide de firebase y lo mandamos a la constante usuario
    const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
    if (validar(usuario1.datos)) {
        usuarioValido = usuario1.datos;
    }
    //console.log(usuarioValido);
    return usuarioValido;
}

async function nuevoUsuario(data) {
    const {hash,salt}= encriptarPassword(data.password);// con esta linea se recupera la contraseña
    data.password=hash; //data.passwprd, aqui guarda lo que esta en hash
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1 = new Usuario(data);
    var usuarioValido={};
    var ususarioGuardado=false;
    
    if (validar(usuario1.datos)) {
        usuarioValido = usuario1.datos;
        await usuariosBD.doc().set(usuarioValido);
        ususarioGuardado=true;
    }
    return ususarioGuardado;

}

async function borrarUsuario(id){
    //console.log(await buscarPorId(id));
    var usuarioBorrado=false;
   if (await buscarPorId(id)!=undefined) {
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
        
    } 
    return usuarioBorrado;

}

//borrarUsuario("100");

//mostrarUsuarios();
//buscarPorId("100");

var data = {
    nombre: "Jesus",
    usuario: "fer",
    password: "12345"
}

//nuevoUsuario(data);


module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId
}

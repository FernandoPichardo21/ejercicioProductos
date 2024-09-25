const crypto = require("crypto");

function encriptarPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    //console.log(salt);
    const hash = crypto.scryptSync(password, salt, 100000, 64, "sha512").toString();
    //console.log(hash);
    return {
        salt, //retornamos para almacenar en las bases de datos para poder mandar el valor que se toma en la contraseña
        hash
    }

}

function validarPassword(password, salt, hash) {
    const hashEvaluar = crypto.scryptSync(password, salt, 100000, 64, "sha512").toString(); //para entregar el mismo conjunto de caracteres
    return hashEvaluar == hash; //va a retornar la contraeña si es exactamente igual a la contraseña que se guardo en hash
    
}

function usuarioAutorizado(){

}

function adminAutorizado(){

}

module.exports={
    encriptarPassword,
    validarPassword,
    usuarioAutorizado,
    adminAutorizado
}


//encriptarPassword("abc");
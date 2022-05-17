'use strict'

const nodemailer = require("nodemailer");
const config = require("../config/config");

const mailCTRL = {};

mailCTRL.enviarMail = (user, res) => {
    
    sendMail1(user, info => {
        console.log('El correo se ha enviado 😃 y la identificación es',info);

    });
};

async function sendMail1(user, callback) {
    var maillist = [user.email, 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 REGISTRO DE USUARIO",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Bienvenido a Job & Care</h2>
                  
                      <h3 style="color: #fff; text-align:left">&nbsp; Correo  : ${user.email}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Rol    : ${user.role}</h3>
                  </td>
              </tr>
              <tr bgcolor="#fff">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table>`
    };


    let info =  transporter.sendMail(mailOptions);

    callback(info);
}


mailCTRL.enviarMailOferta = (user, res) => {
    
    sendMailOferta(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};

async function sendMailOferta(user, callback) {
    var maillist = [user.emailEmpleador, 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 OFERTA CREADA",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">CREASTE UNA NUEVA OFERTA</h2>
                      <h3 style="color: #fff; text-align:left">&nbsp; Correo: ${user.emailEmpleador}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Empleo  : ${user.tituloEmpleo}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Categoria : ${user.categorias}</h3>
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}


mailCTRL.enviarMailHoja = (user, res) => {
    
    sendMailHoja(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};
//la variable user puede ser cualquiera
async function sendMailHoja(user, callback) {
    var maillist = [user.emailHoja, 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 HOJA DE VIDA CREADA",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">CREASTE TU HOJA DE VIDA</h2>
                      <h3 style="color: #fff; text-align:left">&nbsp; Correo: ${user.emailHoja}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Empleo  : ${user.nombre}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Categoria : ${user.categorias}</h3>
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}


mailCTRL.enviarMailPublica = (user, res) => {
    
    sendMailPO(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};
//la variable user puede ser cualquiera
async function sendMailPO(user, callback) {
    var maillist = [user.emailEmpleador, 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 OFERTA PUBLICADA",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">TU OFERTA ESTA PUBLICADA</h2>
                      <h3 style="color: #fff; text-align:left">&nbsp; Correo: ${user.emailEmpleador}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Empleo : ${user.tituloEmpleo}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Estado : ${user.estado}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Categoria : ${user.categorias}</h3>
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}



mailCTRL.enviarMailHojaPublica = (user, res) => {
    
    sendMailHojaP(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};
//la variable user puede ser cualquiera
async function sendMailHojaP(user, callback) {
    var maillist = [user.emailHoja, 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 HOJA DE VIDA PUBLICADA",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">HOJA DE VIDA PUBLICADA</h2>
                      <h3 style="color: #fff; text-align:left">&nbsp; Correo: ${user.emailHoja}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Nombre  : ${user.nombre}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Estado : ${user.estado}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Categoria : ${user.categorias}</h3>
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}


mailCTRL.enviarMailPostulacion = (user, res) => {
    
    sendMailPostulacion(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};
//la variable user puede ser cualquiera
async function sendMailPostulacion(user, callback) {
    var maillist = [user.emailOfertante, 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 NUEVA POSTULACIÓN",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">NUEVA POSTULACIÓN</h2>
                      <h3 style="color: #fff; text-align:left">&nbsp; Nombre  : ${user.nombreEmpleado}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Celular: ${user.telefonohoja}</h3>
                     
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     
                      <a align="center"  href='${user.urlPdfHoja}' target=_blank><button style="text-decoration: none;
                      padding: 10px;
                      font-weight: 600;
                      font-size: 20px;
                      align: center;
                      color: #ffffff;
                      background-color: #1883ba;
                      border-radius: 6px;
                      border: 2px solid #0016b0;">VER HOJA DE VIDA</button></a>
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}


mailCTRL.enviarMailContacto = (user, res) => {
    
    sendMailContacto(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};
//la variable user puede ser cualquiera
async function sendMailContacto(user, callback) {
    var maillist = [user.emailHoja, 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 EMPLEADOR CONTACTANDO",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">EMPLEADOR CONTACTANDO</h2>
                
                      <h3 style="color: #fff; text-align:left">&nbsp; Celular: ${user.telefonoEmpleador}</h3>
                  
                      <h3 style="color: #fff; text-align:left">&nbsp; Correo : ${user.title}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Pudes llamar o enviar correo 📱📨</h3>
                    
                     
                     
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

mailCTRL.enviarMailCurso = (user, res) => {
    
    sendMailCurso(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};
//la variable user puede ser cualquiera
//son el mismo correo al comprar el curso pero son dos funciones distintas
async function sendMailCurso(user, callback) {
    var maillist = [user.email,'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 CURSO COMPRADO",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">CURSO COMPRADO</h2>
                      <h3 style="color: #fff; text-align:left">&nbsp; Titulo : ${user.tituloCurso}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Categoria: ${user.categorias}</h3>
                  
              
                    
                     
                     
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

mailCTRL.enviarMailCursoAdmin = (user, res) => {
    
    sendMailCursoAdmin(user, info => {
        console.log('El correo se ha enviado 😃 ',info);

    });
};
//la variable user puede ser cualquiera
async function sendMailCursoAdmin(user, callback) {
    var maillist = [ 'registro@jobandcare.com']
    let transporter = nodemailer.createTransport(config.transporter);

    let mailOptions = {
        from: '"JOB & CARE" <admin@jobandcare.com>',
        to: maillist,
        subject: "🔔 CURSO COMPRADO",
        html: ` 
              
              <table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6" align="center">
              <tr height="100px">  
                  <td bgcolor="" width="600px">
                  <img src="https://softlutions.ec/api/public/logoazul.jpg" width="280"  height="300">
                  <br>
      
                      <h2 style="color: #fff; text-align:center">Job & Care</h2>
                      <h2 style="color: #fff; text-align:center">CURSO COMPRADO</h2>
                      <h3 style="color: #fff; text-align:left">&nbsp; Titulo : ${user.tituloCurso}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Categoria: ${user.categorias}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Correo : ${user.email}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Categoria: ${user.telefono}</h3>
                      <h3 style="color: #fff; text-align:left">&nbsp; Pudes llamar o enviar correo 📱📨</h3>
                    
                     
                     
                  </td>
              </tr>
              <tr  bgcolor="#56c2c6">
                  <td style="text-align:center">
                      <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                  </td>
              </tr>
              </table> `
    };


    let info = await transporter.sendMail(mailOptions);

    callback(info);
}
//Aqui termina los correos de los cursos ===============================================================//

module.exports = mailCTRL;  
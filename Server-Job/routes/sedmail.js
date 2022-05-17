var express = require('express');
const nodemailer = require("nodemailer");

var Usuario = require("../models/usuario")
var app = express();





app.post("/", (req, res) => {

  let user = req.body;
  sendMail(user, info => {
    console.log(`El correo se ha enviado 😃 y la identificación es ${info.messageId}`);

  });
});

async function sendMail(user, callback) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'jobandcare@gmail.com',
      pass: 'vjdabcdckoonqcmu'
    },
    tls: {
      rejectUnauthorized: false
    }

  });

  let mailOptions = {
    from: '"El usuario"' + "<" + user.email + ">",
    to: "<jobandcare@gmail.com>",
    subject: "Te contactaron en tu pagina Web de Jobandcare",
    html: ` <h1>Formulario de Contacto</h1>
              <p>-----------------------------</p>
          
              <p><b>Email:</b> ${user.email}</p>
              <p><b>Asunto:</b> ${user.asunto}</p>
              <p><b>Mensaje</b> ${user.mensaje}</p>
              <p>Mensaje enviado a https://jobandcare.com<p>
              <a href="https://jobandcare.com">https://jobandcare.com</a>`
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}





module.exports = app;























const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/usuario');
const passwordResetToken = require('../models/resettoken');


module.exports = {
  async CreateUser(req,res) {
    const userEmail = await User.findOne({
      email: req.body.email
    });
    if (userEmail) {
      return res
        .status(409)
        .json({ message: 'Ya existe el correo electrónico' });
    }

    const userName = await User.findOne({
      username: req.body.username
    });
    if (userName) {
      return res
        .status(409)
        .json({ message: 'El nombre de usuario ya existe' });
    }

    return bcrypt.hash(req.body.password,10,(err,hash) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'Error al escribir la contraseña' });
      }
      const body = {
        username: req.body.username,
        email: req.body.email,
        password: hash
      };
      User.create(body)
        .then(user => {
          res
          res.status(201).json({ message: 'Usuario creado con éxito',user });
        })
        .catch(() => {
          res
            .status(500)
            .json({ message: 'Error occured' });
        });
    });
  },

  async ResetPassword(req,res) {
    if (!req.body.email) {
      return res
        .status(500)
        .json({ message: 'correo electronico es requerido' });
    }
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      return res
        .status(409)
        .json({ message: 'El correo electrónico no existe' });
    }
    var resettoken = new passwordResetToken({ _userId: user._id,resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function (err) {
      //  if (err) { return res.status(500).send({ msg: err.message }); }
      passwordResetToken.find({ _userId: user._id,resettoken: { $ne: resettoken.resettoken } }).deleteMany().exec();
      res.status(200).json({ message: 'Restablecer contraseña con éxito.' });
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        //  requireTLS: true,
        auth: {
          user: 'jobandcare@gmail.com',
          pass: 'capo2786'

        },
        tls: {
          rejectUnauthorized: false
        }
      });
      var mailOptions = {
        to: [user.email,'registro@jobandcare.com'],
        from: '"JOB & CARE" <admin@jobandcare.com>',
        subject: 'JOB & CARE Restablecer contraseña',
        text: 'Está recibiendo esto porque usted (u otra persona) ha solicitado restablecer la contraseña de su cuenta.\n\n ' +
          'Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso:\n\n' +
          'https://jobandcare.com/#/response-reset-password/' + resettoken.resettoken + '\n\n' +
          'Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios..\n'
      }
      transporter.sendMail(mailOptions,(err,info) => {
      })
    })
  },

  async ValidPasswordToken(req,res) {
    if (!req.body.resettoken) {
      return res
        .status(500)
        .json({ message: 'Token is required' });
    }
    const user = await passwordResetToken.findOne({
      resettoken: req.body.resettoken
    });
    if (!user) {
      return res
        .status(409)
        .json({ message: 'Invalid URL' });
    }
    User.findOneAndUpdate({ _id: user._userId }).then(() => {
      res.status(200).json({ message: 'Token verified successfully.' });
    }).catch((err) => {
      return res.status(500).send({ msg: err.message });
    });
  },
  async NewPassword(req,res) {
    passwordResetToken.findOne({ resettoken: req.body.resettoken },function (err,userToken,next) {
      if (!userToken) {
        return res
          .status(409)
          .json({ message: 'Token has expired' });
      }

      User.findOne({
        _id: userToken._userId
      },function (err,userEmail,next) {
        if (!userEmail) {
          return res
            .status(409)
            .json({ message: 'User does not exist' });
        }
        return bcrypt.hash(req.body.newPassword,10,(err,hash) => {
          if (err) {
            return res
              .status(400)
              .json({ message: 'Error hashing password' });
          }
          userEmail.password = hash;
          userEmail.save(function (err) {
            if (err) {
              return res
                .status(400)
                .json({ message: 'Password can not reset.' });
            } else {
              userToken.deleteOne();
              return res
                .status(201)
                .json({ message: 'Restablecimiento de contraseña con éxito' });
            }

          });
        });
      });

    })
  }
}
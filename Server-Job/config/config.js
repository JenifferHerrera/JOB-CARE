module.exports = {

    SEED: 'este-es-un-seed-dificil',
    
    email: "jobandcare@gmail.com",
    password: "nqamgfexpprjapfp",
    transporter: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
      //  requireTLS: true,
        auth: {
            user: 'jobandcare@gmail.com',
            pass: 'nqamgfexpprjapfp'  
        },
       tls: {
            rejectUnauthorized: true
        } 
    }   
}

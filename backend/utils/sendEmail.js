const nm = require('nodemailer');

const sendEmail = async(options) =>{
    const trans = nm.createTransport({
        host:'smtp.gmail.com',
        port:465,
        service:'gmail',
        auth:{
            user:'p.vraj2110@gmail.com',
            pass:'cgycgugxohuojqef',
        }
    })

    const mailOp = {
        from:'p.vraj2110@gmail.com',
        to:options.email,
        subject:options.subject,
        html:options.message
    };

    await trans.sendMail(mailOp);
};
module.exports = sendEmail;
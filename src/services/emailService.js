require('dotenv').config();
import nodemailer from 'nodemailer';

let sendsimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
    const info = await transporter.sendMail({
        from: '"Health care 👻" <ledat30052002@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Health care</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin là đúng , vui lòng click vào đường dẫn bên dưới để xác nhận
        và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn !</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Health care</p>
        <p>Information to book a medical appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the information is correct, please click on the link below to confirm and complete the
         procedure to book a medical appointment</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Sincerely thank !</div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD
                }
            });
            const info = await transporter.sendMail({
                from: '"Health care 👻" <ledat30052002@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64',
                    },
                ],
            });
            resolve(true)
        } catch (e) {
            reject(e);
        }
    })
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Health care thàng công</p>
        <p>Thông tin đơn thuốc/hoá đơn được gửi trong tệp đính kèm</p>
        <div>Xin chân thành cảm ơn !</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you have successfully booked an online medical appointment on Health care</p>
        <p>Prescription/invoice information is sent in the attached file</p>
        <div>Sincerely thank !</div>
        `
    }
    return result;
}


let sendCancelBooking = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD
                }
            });
            const info = await transporter.sendMail({
                from: '"Health care 👻" <ledat30052002@gmail.com>',
                to: dataSend.email,
                subject: "Huỷ lịch khám bệnh",
                html: getBodyHTMLEmailCancel(dataSend),
            });
            resolve(true)
        } catch (e) {
            reject(e);
        }
    })
}

let getBodyHTMLEmailCancel = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3> 
        <p>Bạn nhận được email huỷ lịch khám bệnh này lý do vì bạn đã không đến đúng thời gian đặt lịch. Chúng tôi sẽ xem sét các lịch khám bệnh tiếp theo của bạn để tránh các trường hợp tương tự lặp lại .Nếu gặp vấn đề hãy liên hệ ngay với chúng tôi để có thể được hỗ trợ.</p>
        <div>Xin chân thành cảm ơn !</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3> 
        <p>You received an email to cancel this appointment because you did not arrive at the scheduled time. We will review your follow-up appointments to avoid similar cases again. If you have any problems, please contact us immediately for assistance.</p>
       
        <div>Sincerely thank !</div>
        `
    }
    return result;
}
module.exports = {
    sendsimpleEmail, sendAttachment, sendCancelBooking
}
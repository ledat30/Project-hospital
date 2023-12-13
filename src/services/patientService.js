import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let canBook;
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName
                || !data.selectedGender || !data.address || !data.fullName || !data.phoneNumber) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {

                let token = uuidv4(); //⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 3,
                        gender: data.selectedGender,
                        address: data.address,
                        fullName: data.fullName,
                        phonenumber: data.phoneNumber
                    }
                });


                //create a booking record
                if (user && user[0]) {
                    let existingBooking = await db.Booking.findOne({
                        where: {
                            timeType: data.timeType,
                            date: data.date,
                            patientId: user[0].id
                        }
                    });
                    if (existingBooking) {
                        resolve({
                            errCode: 1,
                            errMessage: "You already have an appointment at this time."
                        });
                    } else {
                        await db.Booking.findOrCreate({
                            where: {
                                timeType: data.timeType,
                                date: data.date
                            },
                            defaults: {
                                statusId: 4,
                                doctorId: data.doctorId,
                                scheduleId: data.scheduleId,
                                priceId: data.priceId,
                                patientId: user[0].id,
                                date: data.date,
                                timeType: data.timeType,
                                token: token
                            }
                        });

                        // Gửi email chỉ khi không tồn tại lịch hẹn
                        await emailService.sendsimpleEmail({
                            receiverEmail: data.email,
                            patientName: data.fullName,
                            time: data.timeString,
                            doctorName: data.doctorName,
                            language: data.language,
                            redirectLink: buildUrlEmail(data.doctorId, token)
                        });

                        let schedule = await db.Schedule.findOne({ where: { id: data.scheduleId } });
                        if (schedule) {
                            if (schedule.currentNumber > 0) {
                                schedule.currentNumber -= 1;
                                await db.Schedule.update(
                                    { currentNumber: schedule.currentNumber },
                                    { where: { id: data.scheduleId } }
                                );
                            } else {
                                canBook = false;
                            }
                        }
                    }
                }
                resolve({
                    errCode: 0,
                    errMessage: 'save infor patient success!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}}`
    return result;
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 4
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 5;
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succeed!"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appoitment has been activated or does not exist!"
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    postBookAppointment, postVerifyBookAppointment
}
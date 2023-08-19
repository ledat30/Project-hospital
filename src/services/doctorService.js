import db from '../models/index';
require('dotenv').config();
import _, { reject } from 'lodash';
import emailService from '../services/emailService';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
const CURRENT_NUMBER_SCHEDULE = process.env.CURRENT_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: '2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Doctor_infor, attributes: ['nameClinic', 'nameClinic_en'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 2 },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Doctor_infor, attributes: ['nameClinic', "nameClinic_en", 'addressClinic', 'addressClinic_en'] }
                ],
                raw: true,
                nest: true
            })
            if (doctors && doctors.length > 0) {
                doctors.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary'); //
                    return item;
                })
            }
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e);
        }
    })
}

let checkRequiredFields = (inputData) => {
    let arrFields = ['doctorId', 'contentHTML', 'contentMarkdown', 'action', 'selectedPrice', 'selectedPayment', 'nameClinic_en', 'addressClinic_en', 'note_en',
        'selectedProvince', 'nameClinic', 'addressClinic', 'note', 'specialtyId']

    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i]
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter :${checkObj.element}`
                })
            } else {
                //upsert to doctor_infort table
                let doctorInfor = await db.Doctor_infor.findOne({
                    where: {
                        doctorId: inputData.doctorId,
                    },

                    raw: false
                })
                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId;
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.note = inputData.note;
                    doctorInfor.specialtyId = inputData.specialtyId;
                    doctorInfor.clinicId = inputData.clinicId;
                    doctorInfor.contentHTML = inputData.contentHTML;
                    doctorInfor.contentMarkdown = inputData.contentMarkdown;
                    doctorInfor.description = inputData.description;

                    doctorInfor.addressClinic_en = inputData.addressClinic_en;
                    doctorInfor.nameClinic_en = inputData.nameClinic_en;
                    doctorInfor.note_en = inputData.note_en;
                    doctorInfor.contentHTML_en = inputData.contentHTML_en;
                    doctorInfor.contentMarkdown_en = inputData.contentMarkdown_en;
                    doctorInfor.description_en = inputData.description_en;
                    await doctorInfor.save()
                } else {
                    //create
                    await db.Doctor_infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        addressClinic: inputData.addressClinic,
                        nameClinic: inputData.nameClinic,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,

                        description_en: inputData.description_en,
                        addressClinic_en: inputData.addressClinic_en,
                        nameClinic_en: inputData.nameClinic_en,
                        note_en: inputData.note_en,
                        contentHTML_en: inputData.contentHTML_en,
                        contentMarkdown_en: inputData.contentMarkdown_en,
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'save infor doctor success!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        let foundDoctor = await db.Doctor_infor.findOne({
            where: { doctorId: doctorId },
            raw: false
        })
        if (!foundDoctor) {
            resolve({
                errCode: 2,
                errMessage: `The doctor isn't exist `
            })
        }
        if (foundDoctor) {
            await foundDoctor.destroy();
        }
        resolve({
            errCode: 0,
            message: `The doctor is delete `
        })
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required param!"
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        item.currentNumber = CURRENT_NUMBER_SCHEDULE;
                        return item;
                    })
                }

                //get all existing data
                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorId: data.doctorId, date: data.formatedDate },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true
                    }
                );

                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: "OK"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parmeter!'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        //db : truyền vào
                        doctorId: doctorId,
                        date: date,
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['fullName'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getExtraInfforDoctorById = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parmeter!'
                })
            } else {
                let data = await db.Doctor_infor.findOne({
                    where: {
                        doctorId: idInput
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getProfileDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parmeter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] }
                        ,
                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parmeter!'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 5,
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'fullName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                            ],
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']
                        }
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parmeter!'
                })
            } else {
                //update patient status
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 5
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 6;
                    await appointment.save();
                }

                //send email remedy
                await emailService.sendAttachment(data);

                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let searchDoctor = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.User.findAll({
                where: {
                    fullName: {
                        [db.Sequelize.Op.like]: `%${keyword}%`,
                    },
                },
            });
            if (results && results.length > 0) {
                results.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary'); //
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: "ok",
                results
            })
        } catch (e) {
            reject(e);
        }
    })
};

let search = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.User.findAll({
                where: {
                    fullName: {
                        [db.Sequelize.Op.like]: `%${keyword}%`,
                    },
                },
            });
            resolve({
                errCode: 0,
                errMessage: "ok",
                results
            })
        } catch (e) {
            reject(e);
        }
    })
};

const getAllSchedule = (date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            } else {
                let schedule = await db.Schedule.findAll({
                    where: {
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['fullName', 'id'] }
                    ],
                    raw: false,
                    nest: true
                });

                if (!schedule) schedule = [];
                resolve({
                    errCode: 0,
                    data: schedule
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let searchSchedule = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Schedule.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'doctorData',
                        attributes: ['fullName'],
                        where: {
                            fullName: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                    },
                    {
                        model: db.Allcode,
                        as: 'timeTypeData',
                        attributes: ['valueEn', 'valueVi'],
                    },
                ],
                raw: true // Thêm option raw: true để lấy dữ liệu gốc từ cơ sở dữ liệu
            });

            resolve({
                errCode: 0,
                errMessage: "ok",
                results: results
            });
        } catch (e) {
            console.log(e);
            reject({
                errCode: -1,
                errMessage: 'Error from the server'
            });
        }
    });
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome, getAllDoctor, saveDetailInforDoctor, getDetailDoctorById, searchDoctor, search, searchSchedule,
    bulkCreateSchedule, getScheduleDoctorByDate, getExtraInfforDoctorById, getProfileDoctorById,
    getListPatientForDoctor, sendRemedy, deleteDoctor, getAllSchedule
}
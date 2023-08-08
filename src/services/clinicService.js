import db from '../models/index';
const notifier = require('node-notifier');

let checkNameClinic = (nameCLinc) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { name: nameCLinc }
            })
            if (clinic) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkNameClinic(data.name);
            if (check === true) {
                notifier.notify({
                    title: 'Error',
                    message: 'Your name is already in used ,plz try another name ',
                    icon: 'path/to/error-icon.png',
                    sound: 'Basso',
                    wait: true,
                    timeout: 4000,
                    error: true
                });
                resolve({
                    errCode: 1,
                    errMessage: 'Your name is already in used ,plz try another name ',
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    name_en: data.name_en,
                    image: data.avatar,
                    address: data.address,
                    address_en: data.address_en,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML_En: data.descriptionHTML,
                    descriptionMarkdown_En: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: " create ok"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getAllClinic = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
            });

            //covert => img string
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary'); //
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: "ok",
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'name_en', 'address_en', 'descriptionHTML_En', 'descriptionMarkdown_En', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                })
                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })

                    data.doctorClinic = doctorClinic;

                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: "ok",
                    data
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}


let HandleEditClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown
                || !data.address) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (clinic) {
                clinic.name = data.name;
                clinic.name_en = data.name_en;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                clinic.address = data.address;
                clinic.address_en = data.address_en;
                clinic.descriptionHTML_En = data.descriptionHTML_En;
                clinic.descriptionMarkdown_En = data.descriptionMarkdown_En;
                if (data.avatar) {
                    clinic.image = data.avatar;
                }
                await clinic.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user successed'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        let foundClinic = await db.Clinic.findOne({
            where: { id: clinicId },
            raw: false
        })
        if (!foundClinic) {
            resolve({
                errCode: 2,
                errMessage: `The clinic isn't exist `
            })
        }
        if (foundClinic) {
            await foundClinic.destroy();
        }
        resolve({
            errCode: 0,
            message: `The clinic is delete `
        })
    })
}

let getClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();

            //covert => img string
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary'); //
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: "ok",
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let search = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Clinic.findAll({
                where: {
                    name: {
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

let searchClinic = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Clinic.findAll({
                where: {
                    name: {
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
module.exports = {
    createClinicService, getAllClinic, getDetailClinicById, HandleEditClinic, deleteClinic,
    getClinic, search, searchClinic
}
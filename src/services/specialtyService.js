import db from '../models/index';
const notifier = require('node-notifier');

let checkNameSpecialty = (nameSpecialty) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { name: nameSpecialty }
            })
            if (specialty) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}
let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkNameSpecialty(data.name);
            if (check === true) {
                notifier.notify({
                    title: 'Error',
                    message: 'Your name is already in used ,plz try another name  ',
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
                await db.Specialty.create({
                    name: data.name,
                    name_en: data.name_en,
                    image: data.avatar,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML_En: data.descriptionHTML_En,
                    descriptionMarkdown_En: data.descriptionMarkdown_En,
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

let getAllSpecialty = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
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

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'descriptionHTML_En', 'descriptionMarkdown_En'],
                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    } else {
                        //find by location
                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: { specialtyId: inputId, provinceId: location },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;

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

let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        let foundSpecialty = await db.Specialty.findOne({
            where: { id: specialtyId },
            raw: false
        })
        if (!foundSpecialty) {
            resolve({
                errCode: 2,
                errMessage: `The specialty isn't exist `
            })
        }
        if (foundSpecialty) {
            await foundSpecialty.destroy();
        }
        resolve({
            errCode: 0,
            message: `The specialty is delete `
        })
    })
}

let HandleEditSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.descriptionHTML || !data.descriptionMarkdown || !data.name) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            })
            if (specialty) {
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                specialty.name = data.name;
                specialty.name_en = data.name_en;
                specialty.descriptionHTML_En = data.descriptionHTML_En,
                    specialty.descriptionMarkdown_En = data.descriptionMarkdown_En
                if (data.avatar) {
                    specialty.image = data.avatar;
                }
                await specialty.save();
                resolve({
                    errCode: 0,
                    message: 'Update the specialty successed'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Specialty not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();

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
            const results = await db.Specialty.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            name: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            name_en: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        }
                    ],
                },
                attributes: ['name', 'name_en'],
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

let searchSpecialty = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Specialty.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            name: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            name_en: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        }
                    ],
                },
                attributes: ['name', 'name_en', 'image'],
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
    createSpecialty, getAllSpecialty, getDetailSpecialtyById, deleteSpecialty, HandleEditSpecialty, getSpecialty, search, searchSpecialty
}
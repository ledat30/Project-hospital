import db from '../models/index';
const notifier = require('node-notifier');

let checkNamePolicy = (namePolicy) => {
    return new Promise(async (resolve, reject) => {
        try {
            let policy = await db.Policy.findOne({
                where: { nameVI: namePolicy }
            })
            if (policy) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let createPolicyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkNamePolicy(data.nameVI);
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
                await db.Policy.create({
                    nameVI: data.nameVI,
                    nameEN: data.nameEN,
                    contentHTMLVi: data.contentHTMLVi,
                    contentMarkdownVi: data.contentMarkdownVi,
                    contentHTMLEn: data.contentHTMLEn,
                    contentMarkdownEn: data.contentMarkdownEn,
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

let getAllPolicy = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Policy.findAll();
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

let getLimitPolicy = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Policy.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
            });
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

let deletePolicy = (policyId) => {
    return new Promise(async (resolve, reject) => {
        let foundPolicy = await db.Policy.findOne({
            where: { id: policyId },
            raw: false
        })
        if (!foundPolicy) {
            resolve({
                errCode: 2,
                errMessage: `The policy isn't exist `
            })
        }
        if (foundPolicy) {
            await foundPolicy.destroy();
        }
        resolve({
            errCode: 0,
            message: `The policy is delete `
        })
    })
}

let HandleEditPolicy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameEN || !data.contentHTMLVi || !data.nameVI
                || !data.contentMarkdownEn || !data.contentMarkdownVi || !data.contentHTMLEn) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let policy = await db.Policy.findOne({
                where: { id: data.id },
                raw: false
            })
            if (policy) {
                policy.contentHTMLEn = data.contentHTMLEn;
                policy.contentHTMLVi = data.contentHTMLVi;
                policy.contentMarkdownEn = data.contentMarkdownEn;
                policy.contentMarkdownVi = data.contentMarkdownVi;
                policy.nameEN = data.nameEN;
                policy.nameVI = data.nameVI;
                await policy.save();
                resolve({
                    errCode: 0,
                    message: 'Update the policy successed'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'policy not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailPolicyById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let data = await db.Policy.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['nameEN', 'nameVI', 'contentHTMLVi', 'contentMarkdownVi',
                        'contentHTMLEn', 'contentMarkdownEn'],
                })
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

let search = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Policy.findAll({
                where: {
                    nameVI: {
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

let searchPolicy = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Policy.findAll({
                where: {
                    nameVI: {
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
module.exports = {
    createPolicyService, getAllPolicy, deletePolicy, HandleEditPolicy, getDetailPolicyById,
    search, getLimitPolicy, searchPolicy
}
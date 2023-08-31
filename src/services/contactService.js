import db from '../models/index';

let getAllContact = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Contact.findAll();
            resolve({
                errCode: 0,
                errMessage: "ok",
                data
            })
        } catch (e) {
            reject(e);
        }
    })
};

let deleteContact = (contactId) => {
    return new Promise(async (resolve, reject) => {
        let foundContact = await db.Contact.findOne({
            where: { id: contactId },
            raw: false
        })
        if (!foundContact) {
            resolve({
                errCode: 2,
                errMessage: `The contact isn't exist `
            })
        }
        if (foundContact) {
            await foundContact.destroy();
        }
        resolve({
            errCode: 0,
            message: `The contact is delete `
        })
    })
}

let search = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Contact.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            name: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        }
                    ],
                },
                attributes: ['name', 'email', 'message'],
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

let createContact = async (name, email, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact = await db.Contact.create({ name, email, message });
            resolve({
                errCode: 0,
                errMessage: " create ok"
            })
            return contact;
        } catch (error) {
            reject(e);
        }
    })
}

module.exports = {
    getAllContact, deleteContact, search, createContact
}
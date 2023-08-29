import db from '../models/index';

const searchHomePage = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const clinicResults = await db.Clinic.findAll({
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
                        },
                    ],
                },
                attributes: ['name', 'name_en', 'id'],
            });

            const handbookResults = await db.Handbook.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            title: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            title_en: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                    ],
                },
                attributes: ['title', 'title_en', 'id'],
            });

            const specialtyResults = await db.Specialty.findAll({
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
                attributes: ['name', 'name_en', 'id'],
            });
            const renamedResults = specialtyResults.map((result) => ({
                name_specialty: result.name,
                name_en_specialty: result.name_en,
                id: result.id,
            }));
            

            const doctorResults = await db.User.findAll({
                where: {
                    fullName: {
                        [db.Sequelize.Op.like]: `%${keyword}%`,
                    },
                },
            });

            const policyResults = await db.Policy.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            nameVI: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            nameEN: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        }
                    ],
                },
                attributes: ['nameVI', 'nameEN', 'id'],
            });


            resolve({
                errCode: 0,
                errMessage: 'ok',
                clinicResults,
                handbookResults,
                renamedResults,
                doctorResults,
                policyResults,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    searchHomePage,
};
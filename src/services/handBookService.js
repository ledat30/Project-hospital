import db from '../models/index';
const notifier = require('node-notifier');

let checkNameHandbook = (nameHandbook) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Handbook.findOne({
                where: { title: nameHandbook }
            })
            if (category) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let createHandbookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkNameHandbook(data.title);
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
                await db.Handbook.create({
                    title: data.title,
                    title_en: data.title_en,
                    categoryId: data.categoryId,
                    user_id: data.user_id,
                    image: data.avatar,
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

let getAllHandBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll();

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

let deleteHandBook = (handBookId) => {
    return new Promise(async (resolve, reject) => {
        let foundHandBook = await db.Handbook.findOne({
            where: { id: handBookId },
            raw: false
        })
        if (!foundHandBook) {
            resolve({
                errCode: 2,
                errMessage: `The specialty isn't exist `
            })
        }
        if (foundHandBook) {
            await foundHandBook.destroy();
        }
        resolve({
            errCode: 0,
            message: `The specialty is delete `
        })
    })
}

let HandleEditHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.contentHTMLEn || !data.categoryId || !data.contentHTMLVi || !data.title || !data.title_en || !data.contentMarkdownEn || !data.contentMarkdownVi) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let handbook = await db.Handbook.findOne({
                where: { id: data.id },
                raw: false
            })
            if (handbook) {
                handbook.contentHTMLEn = data.contentHTMLEn;
                handbook.categoryId = data.categoryId;
                handbook.contentHTMLVi = data.contentHTMLVi;
                handbook.contentMarkdownEn = data.contentMarkdownEn;
                handbook.contentMarkdownVi = data.contentMarkdownVi;
                handbook.title = data.title;
                handbook.title_en = data.title_en;
                handbook.user_id = data.user_id;
                if (data.avatar) {
                    handbook.image = data.avatar;
                }
                await handbook.save();
                resolve({
                    errCode: 0,
                    message: 'Update the handbook successed'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Handbook not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const increaseCount = async (inputId) => {
    try {
        const handbook = await db.Handbook.findOne({
            where: {
                id: inputId
            }
        });

        if (!handbook) {
            throw new Error("Handbook not found");
        }

        handbook.count += 1;

        await db.Handbook.update(
            { count: handbook.count },
            { where: { id: inputId } }
        );

        return {
            errCode: 0,
            errMessage: "OK"
        };
    } catch (error) {
        throw error;
    }
};

let getDetailHandBookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['title', 'title_en', 'count', 'contentHTMLVi', 'contentMarkdownVi',
                        'contentHTMLEn', 'categoryId', 'contentMarkdownEn', 'user_id', 'createdAt', 'updatedAt'],
                })
                if (!data) {
                    resolve({
                        errCode: 2,
                        errMessage: "Handbook not found"
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: "ok",
                        data
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkNameCategory = (nameCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.CategoryHandbook.findOne({
                where: { nameVI: nameCategory }
            })
            if (category) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let createCategoryHandbookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkNameCategory(data.nameVI);
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
                await db.CategoryHandbook.create({
                    nameVI: data.nameVI,
                    nameEN: data.nameEN,
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

let getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.CategoryHandbook.findAll();
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
let HandleDeleteCategoryHB = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        let foundCategory = await db.CategoryHandbook.findOne({
            where: { id: categoryId },
            raw: false
        })
        if (!foundCategory) {
            resolve({
                errCode: 2,
                errMessage: `The category isn't exist `
            })
        }
        if (foundCategory) {
            await foundCategory.destroy();
        }
        resolve({
            errCode: 0,
            message: `The category is delete `
        })
    })
}

let HandleEditCategoryHB = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameEN || !data.nameVI) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let category = await db.CategoryHandbook.findOne({
                where: { id: data.id },
                raw: false
            })
            if (category) {
                category.nameEN = data.nameEN;
                category.nameVI = data.nameVI;
                await category.save();
                resolve({
                    errCode: 0,
                    message: 'Update the category successed'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Category not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getTopHandbookHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll({
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

let getDetailCategoryById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.CategoryHandbook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['nameVI', 'nameEN'],
                });
                if (data) {
                    let handBook = [];

                    handBook = await db.Handbook.findAll({
                        where: { categoryId: inputId },
                        attributes: ['title', 'title_en', 'image', 'categoryId', 'id'],
                    })

                    data.handBook = handBook;

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

let searchCategory = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.CategoryHandbook.findAll({
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
                attributes: ['nameVI', 'nameEN'],
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

let searchHandBook = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Handbook.findAll({
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
                        }
                    ],
                },
                attributes: ['title', 'title_en'],
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

let search = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.Handbook.findAll({
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
                        }
                    ],
                },
                attributes: ['title', 'title_en', 'image'],
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
    createHandbookService, getAllHandBook, deleteHandBook, HandleEditHandBook, getDetailHandBookById, createCategoryHandbookService, getAllCategory, searchCategory, HandleDeleteCategoryHB, HandleEditCategoryHB, getTopHandbookHome, getDetailCategoryById,
    searchHandBook, search, increaseCount
}
import db from '../models/index';
const notifier = require('node-notifier');

let checkNameQuestion = (nameQuestion) => {
    return new Promise(async (resolve, reject) => {
        try {
            let question = await db.Question.findOne({
                where: { question_vi: nameQuestion }
            })
            if (question) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}
let createQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkNameQuestion(data.question_vi);
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
                await db.Question.create({
                    question_vi: data.question_vi,
                    question_en: data.question_en,
                    answer_vi: data.answer_vi,
                    answer_en: data.answer_en,
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

let getAllQuestion = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Question.findAll();

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
            const results = await db.Question.findAll({
                where: {
                    question_vi: {
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

let deleteQuestion = (questionId) => {
    return new Promise(async (resolve, reject) => {
        let foundQuestion = await db.Question.findOne({
            where: { id: questionId },
            raw: false
        })
        if (!foundQuestion) {
            resolve({
                errCode: 2,
                errMessage: `The question isn't exist `
            })
        }
        if (foundQuestion) {
            await foundQuestion.destroy();
        }
        resolve({
            errCode: 0,
            message: `The question is delete `
        })
    })
}

let HandleEditQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.question_en || !data.question_vi || !data.answer_en
                || !data.answer_vi) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let question = await db.Question.findOne({
                where: { id: data.id },
                raw: false
            })
            if (question) {
                question.question_en = data.question_en;
                question.question_vi = data.question_vi;
                question.answer_en = data.answer_en;
                question.answer_vi = data.answer_vi;
                await question.save();
                resolve({
                    errCode: 0,
                    message: 'Update the question successed'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'question not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createQuestion, getAllQuestion, search, deleteQuestion, HandleEditQuestion
}

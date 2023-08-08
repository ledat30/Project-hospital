import questionService from '../services/questionService';

let createQuestion = async (req, res) => {
    try {
        let data = req.body;
        let infor = await questionService.createQuestion(data);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllQuestion = async (req, res) => {
    try {
        let infor = await questionService.getAllQuestion();
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let search = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await questionService.search(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let HandleDeleteQuestion = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await questionService.deleteQuestion(req.body.id);
    return res.status(200).json(message);
}

let HandleEditQuestion = async (req, res) => {
    try {
        let infor = await questionService.HandleEditQuestion(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    createQuestion, getAllQuestion, search, HandleDeleteQuestion, HandleEditQuestion
}
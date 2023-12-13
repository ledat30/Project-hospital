import handBookService from '../services/handBookService';

let createHandbook = async (req, res) => {
    try {
        let infor = await handBookService.createHandbookService(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllHandBook = async (req, res) => {
    try {
        let infor = await handBookService.getAllHandBook();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let HandleDeleteHB = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await handBookService.deleteHandBook(req.body.id);
    return res.status(200).json(message);
}

let HandleEditHB = async (req, res) => {
    try {
        let infor = await handBookService.HandleEditHandBook(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailHandBookById = async (req, res) => {
    try {
        let infor = await handBookService.getDetailHandBookById(req.query.id);
        await handBookService.increaseCount(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createCategoryHandbook = async (req, res) => {
    try {
        let infor = await handBookService.createCategoryHandbookService(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getAllCategory = async (req, res) => {
    try {
        let infor = await handBookService.getAllCategory();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let HandleDeleteCategoryHB = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await handBookService.HandleDeleteCategoryHB(req.body.id);
    return res.status(200).json(message);
}
let HandleEditCategoryHB = async (req, res) => {
    try {
        let infor = await handBookService.HandleEditCategoryHB(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getTopHandbookHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await handBookService.getTopHandbookHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getDetailCategoryById = async (req, res) => {
    try {
        let infor = await handBookService.getDetailCategoryById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let searchCategory = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await handBookService.searchCategory(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let searchHandBook = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await handBookService.searchHandBook(keyword);
        res.json(results);
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
        const results = await handBookService.search(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    createHandbook, getAllHandBook, HandleDeleteHB, HandleEditHB, getDetailHandBookById,
    createCategoryHandbook, getAllCategory, HandleDeleteCategoryHB, HandleEditCategoryHB,
    getTopHandbookHome, getDetailCategoryById, searchCategory, searchHandBook, search
}
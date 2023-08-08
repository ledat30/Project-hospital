import specialtyService from '../services/specialtyService';


let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllSpecialty = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let infor = await specialtyService.getAllSpecialty(+limit);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}


let HandleDeleteSpecialty = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await specialtyService.deleteSpecialty(req.body.id);
    return res.status(200).json(message);
}

let HandleEditSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.HandleEditSpecialty(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getSpecialty = async (req, res) => {
    try {
        let doctors = await specialtyService.getSpecialty();
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

//
let search = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await specialtyService.search(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let searchSpecialty = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await specialtyService.searchSpecialty(keyword);
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
    createSpecialty, getAllSpecialty, getDetailSpecialtyById, HandleDeleteSpecialty, HandleEditSpecialty, getSpecialty, search, searchSpecialty
}
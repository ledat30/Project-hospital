import clinicService from '../services/clinicService';

let createClinic = async (req, res) => {
    try {
        let data = req.body;
        let infor = await clinicService.createClinicService(data);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllClinic = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let infor = await clinicService.getAllClinic(+limit);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let HandleEditClinic = async (req, res) => {
    try {
        let infor = await clinicService.HandleEditClinic(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let HandleDeleteClinic = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await clinicService.deleteClinic(req.body.id);
    return res.status(200).json(message);
}

let getClinic = async (req, res) => {
    try {
        let infor = await clinicService.getClinic();
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
        const results = await clinicService.search(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let searchClinic = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await clinicService.searchClinic(keyword);
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
    createClinic, getAllClinic, getDetailClinicById, HandleEditClinic, HandleDeleteClinic,
    getClinic, search, searchClinic
}
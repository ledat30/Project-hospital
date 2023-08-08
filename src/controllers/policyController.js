import policyService from '../services/policyService';

let createPolicy = async (req, res) => {
    try {
        let infor = await policyService.createPolicyService(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getAllPolicy = async (req, res) => {
    try {
        let infor = await policyService.getAllPolicy(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getLimitPolicy = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 6;
    try {
        let infor = await policyService.getLimitPolicy(+limit);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let HandleDeletePolicy = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await policyService.deletePolicy(req.body.id);
    return res.status(200).json(message);
}

let HandleEditPolicy = async (req, res) => {
    try {
        let infor = await policyService.HandleEditPolicy(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailPolicyById = async (req, res) => {
    try {
        let infor = await policyService.getDetailPolicyById(req.query.id);
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
        const results = await policyService.search(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let searchPolicy = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await policyService.searchPolicy(keyword);
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
    createPolicy, getAllPolicy, HandleDeletePolicy, HandleEditPolicy, getDetailPolicyById,
    search, getLimitPolicy, searchPolicy
}
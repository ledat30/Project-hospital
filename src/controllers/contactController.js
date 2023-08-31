import contactService from '../services/contactService';

let getAllContact = async (req, res) => {
    try {
        let contact = await contactService.getAllContact();
        return res.status(200).json(contact)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let HandleDeleteContact = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await contactService.deleteContact(req.body.id);
    return res.status(200).json(message);
}

let search = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await contactService.search(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = await contactService.createContact(name, email, message);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json(
            {
                error: 'error contact'
            }
        );
    }
};

module.exports = {
    getAllContact, HandleDeleteContact, search, createContact
}
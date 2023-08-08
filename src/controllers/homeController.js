import { render } from "ejs";
import db from "../models/index";
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCrud = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message)
    return res.send('post')
}

let displayCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        //check user data not found

        return res.render('editCRUD.ejs', {
            // x <-- y 
            user: userData
        });
    }
    else {
        return res.send('User not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservice.updateUserData(data);
    return res.redirect('/get-crud');
}
let postDelete = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDservice.deleteUserById(userId);
        return res.send("delete succeed")
    } else {
        return res.send('user no found')
    }

}
module.exports = {
    getHomePage, getCRUD, postCrud, displayCRUD, getEditCRUD, putCRUD, postDelete
}
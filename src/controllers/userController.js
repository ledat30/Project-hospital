import userService from '../services/userService';
require('dotenv').config();
import nodemailer from 'nodemailer';
import db from '../models/index';

let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //all , id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users,
    })
}
let createHandleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let HandleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
let HandleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters!'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let search = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await userService.search(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const resetToken = await userService.createPasswordResetToken(email);

        // Gửi email
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: '"Health care 👻" <ledat30052002@gmail.com>',
            to: email,
            subject: "Thông tin đổi mật khẩu",
            html: ` <h3>Xin chào!</h3>
            <p>Bạn nhận được email này để thực hiện việc đổi mật khẩu!</p>
            <p>Mã đổi mật khẩu của bạn là: ${resetToken}</p>
            <div>Xin chân thành cảm ơn!</div>
            `,
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
};

const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        // Kiểm tra và xóa mã đặt lại mật khẩu hết hạn
        const { isValid, userId } = await userService.checkAndDeleteResetToken(resetToken);

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Đặt lại mật khẩu mới cho người dùng
        await userService.resetUserPassword(userId, newPassword);

        res.status(200).json({ message: 'Password reset successful' });

        const resetTokenFromClient = req.body.resetToken;
        if (resetTokenFromClient !== user.reset_token) {
            return res.status(400).json({ error: "Invalid reset token" });
        }
    } catch (error) {
        console.error("Forgot password error:", error);
    }
};
module.exports = {
    handleLoging: handleLoging, handleGetAllUsers: handleGetAllUsers, createHandleCreateNewUser,
    HandleEditUser, HandleDeleteUser, getAllCode, search, forgotPassword, resetPassword
}
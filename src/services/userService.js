import db from '../models/index';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
const salt = bcrypt.genSaltSync(10);
const notifier = require('node-notifier');

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'fullName', 'address', 'phonenumber', 'image'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);


                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                notifier.notify({
                    title: 'Error',
                    message: 'Your email is already in used ,plz try another email   ',
                    icon: 'path/to/error-icon.png',
                    sound: 'Basso',
                    wait: true,
                    timeout: 5000,
                    error: true
                });
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used ,plz try another email ',
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    fullName: data.fullName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId },
            raw: false
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist `
            })
        }
        if (foundUser) {
            await foundUser.destroy();
        }
        resolve({
            errCode: 0,
            message: `The user is delete `
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.fullName = data.fullName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                if (data.avatar) {
                    user.image = data.avatar;
                }


                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user successed'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}


let search = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await db.User.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            fullName: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            email: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            phonenumber: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                    ],
                },
                attributes: ['fullName', 'email', 'phonenumber', 'address'],
            });
            resolve({
                errCode: 0,
                errMessage: "ok",
                results
            });
        } catch (e) {
            reject(e);
        }
    });
};

let createPasswordResetToken = async (email) => {
    const resetToken = generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // Hết hạn sau 1 giờ

    // Lưu mã đặt lại mật khẩu vào bảng user
    await db.User.update(
        { reset_token: resetToken, expires_at: expiresAt },
        { where: { email } }
    );

    return resetToken;
};

const checkAndDeleteResetToken = async (resetToken) => {
    const user = await db.User.findOne({ where: { reset_token: resetToken || null } });

    if (!user) {
        return { isValid: false };
    }

    const userId = user.id;
    const expiresAt = user.expires_at;
    if (expiresAt < new Date()) {
        // Xóa mã đặt lại mật khẩu hết hạn
        await db.User.update(
            { reset_token: null, expires_at: null },
            { where: { reset_token: resetToken } }
        );
        return { isValid: false };
    }

    // Mã đặt lại mật khẩu hợp lệ và chưa hết hạn
    return { isValid: true, userId };
};

const resetUserPassword = async (userId, newPassword) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Cập nhật mật khẩu mới trong bảng user
        await db.User.update(
            { password: hashedPassword },
            { where: { id: userId } }
        );
    } catch (error) {
        // Xử lý lỗi nếu có
        console.log('Lỗi khi reset mật khẩu:', error);
        throw error;
    }
};

// Hàm tạo mã đặt lại mật khẩu
const generateResetToken = () => {
    // Thực hiện logic để tạo mã đặt lại mật khẩu
    // Ví dụ: sử dụng thư viện crypto để tạo một chuỗi ngẫu nhiên làm mã đặt lại mật khẩu
    const resetToken = crypto.randomBytes(5).toString('hex');
    return resetToken;
};

module.exports = {
    handleUserLogin: handleUserLogin, getAllUsers: getAllUsers, createNewUser, deleteUser,
    updateUserData, getAllCodeService, search, createPasswordResetToken, checkAndDeleteResetToken,
    resetUserPassword
}
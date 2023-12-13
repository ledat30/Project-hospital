import db from '../models/index';

let countDocuments = async () => {
    try {
        const statusIds = [5, 6, 7];
        const totalAppointments = await db.Booking.count({ where: { statusId: statusIds } });
        return totalAppointments;
    } catch (error) {
        throw new Error('Error retrieving total appointments');
    }
};

let countCompletedAppointments = async () => {
    try {
        const totalCompletedAppointments = await db.Booking.count({ where: { statusId: 6 } });
        return totalCompletedAppointments;
    } catch (error) {
        throw new Error('Error retrieving completed appointments');
    }
};

let countCancelledAppointments = async () => {
    try {
        const totalCancelledAppointments = await db.Booking.count({ where: { statusId: 7 } });
        return totalCancelledAppointments;
    } catch (error) {
        throw new Error('Error retrieving cancelled appointments');
    }
};


let countConfirmed = async () => {
    try {
        const totalConfirmAppointments = await db.Booking.count({ where: { statusId: 5 } });
        return totalConfirmAppointments;
    } catch (error) {
        throw new Error('Error retrieving confirm appointments');
    }
}

let countALL = async () => {
    try {
        const roles = [1, 2, 3];
        const totalAll = await db.User.count({ where: { roleId: roles } });
        return totalAll;
    } catch (error) {
        throw new Error('Error retrieving total all user');
    }
};

let countAdmin = async () => {
    try {
        const totalAdmin = await db.User.count({ where: { roleId: 1 } });
        return totalAdmin;
    } catch (error) {
        throw new Error('Error retrieving admin');
    }
}

let countDoctor = async () => {
    try {
        const totalDoctor = await db.User.count({ where: { roleId: 2 } });
        return totalDoctor;
    } catch (error) {
        throw new Error('Error retrieving doctor');
    }
}

let countPatinet = async () => {
    try {
        const totalPatinet = await db.User.count({ where: { roleId: 3 } });
        return totalPatinet;
    } catch (error) {
        throw new Error('Error retrieving patinet');
    }
}

let getTopViewedHandbooks = async (limit) => {
    try {
        const topHandbooks = await db.Handbook.findAll({
            order: [['count', 'DESC']],
            limit: limit,
        });
        return topHandbooks;
    } catch (error) {
        throw error;
    }
};

let getTopViewedDoctors = async (limit) => {
    try {
        const topDoctors = await db.User.findAll({
            attributes: ['fullName'],
            include: [
                {
                    model: db.Doctor_infor,
                    attributes: ['count']
                }
            ],
            where: {
                roleId: 2
            },
            order: [[db.Doctor_infor, 'count', 'DESC']],
            limit: limit,
            raw: true,
            nest: true
        });
        return topDoctors;
    } catch (error) {
        throw error;
    }
};

const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formatter.format(amount);
};

const getBookingTotalsByDate = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const bookings = await db.Booking.findAll({
                attributes: [
                    [db.sequelize.literal("DATE_FORMAT(FROM_UNIXTIME(date / 1000), '%d-%m-%Y')"), 'date'],
                    [db.sequelize.fn('sum', db.sequelize.cast(db.sequelize.fn('REPLACE', db.sequelize.col('price.valueVi'), '.', ''), 'DECIMAL(10,2)')), 'total'],
                ],
                include: [
                    { model: db.Allcode, as: 'price', attributes: ['valueEn', 'valueVi'] },
                ],
                where: {
                    id: db.sequelize.col('booking.priceId'),
                    statusId: 6,
                },
                group: ['date'],
                raw: true,
                nest: true
            });
            const totalsByDate = [];
            if (bookings && bookings.length > 0) {
                bookings.forEach((booking) => {
                    if (booking && booking.date) {
                        const formattedTotal = formatCurrency(booking.total);
                        totalsByDate.push({
                            date: booking.date,
                            total: formattedTotal,
                        });
                    }
                });
            }
            const overallTotal = totalsByDate.reduce((sum, booking) => sum + parseFloat(booking.total.replace(/\./g, '').replace(',', '.')), 0);
            const formattedOverallTotal = overallTotal.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' VND';
            resolve({
                errCode: 0,
                errMessage: "ok",
                formattedOverallTotal,
                totalsByDate
            })
        } catch (error) {
            throw error;
        }
    })

};


module.exports = {
    countDocuments,
    countCompletedAppointments,
    countCancelledAppointments, getTopViewedDoctors, getBookingTotalsByDate,
    countConfirmed, countALL, countAdmin, countDoctor, countPatinet, getTopViewedHandbooks
}
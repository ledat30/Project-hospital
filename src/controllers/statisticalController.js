import statisticalService from '../services/statisticalService';

let tableTotalApppointment = async (req, res) => {
    try {
        const totalAppointments = await statisticalService.countDocuments();
        const totalCompletedAppointments = await statisticalService.countCompletedAppointments();
        const totalCancelledAppointments = await statisticalService.countCancelledAppointments();
        const totalScheduleConfirmed = await statisticalService.countConfirmed();
        return res.status(200).json({
            totalAppointments: totalAppointments,
            totalCompletedAppointments: totalCompletedAppointments,
            totalCancelledAppointments: totalCancelledAppointments,
            totalScheduleConfirmed: totalScheduleConfirmed
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

let tableTotalUser = async (req, res) => {
    try {
        const totalAll = await statisticalService.countALL();
        const totalAdmin = await statisticalService.countAdmin();
        const totalDoctor = await statisticalService.countDoctor();
        const totalPatinet = await statisticalService.countPatinet();
        return res.status(200).json({
            totalAll: totalAll,
            totalAdmin: totalAdmin,
            totalDoctor: totalDoctor,
            totalPatinet: totalPatinet
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

let getTopViewedHandbooks = async (req, res) => {
    try {
        const topHandbooks = await statisticalService.getTopViewedHandbooks(6);
        res.status(200).json(topHandbooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

let getTopViewedDoctors = async (req, res) => {
    try {
        const topDoctors = await statisticalService.getTopViewedDoctors(10);
        res.status(200).json(topDoctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

let getBookingTotal = async (req, res) => {
    try {
        const totalsByDate = await statisticalService.getBookingTotalsByDate();
        res.status(200).json({ totalsByDate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    tableTotalApppointment, tableTotalUser, getTopViewedHandbooks, getTopViewedDoctors, getBookingTotal,
}
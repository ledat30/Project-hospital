import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

const deleteDoctorService = (doctorId) => {
    return axios.delete('/api/delete-doctor', {
        data: {
            id: doctorId
        }
    });
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}


const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const saveScheduleDoctor = (data, doctorId) => {
    return axios.post(`/api/bulk-create-schedule-doctor?doctorId=${doctorId}`, data)
}


const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getAllSchedule = (date) => {
    return axios.get(`/api/getAllSchedule?date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-by-id?doctorId=${doctorId}`)
}


const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}


const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}

const getSpecialty = () => {
    return axios.get(`/api/get-all-category-specialty`)
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-all-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const deleteSpecialtyService = (specialtyId) => {
    return axios.delete('/api/delete-specialty', {
        data: {
            id: specialtyId
        }
    });
}
const editSpecialtyService = (inputData) => {
    return axios.put('/api/edit-specialty', inputData);
}

const createNewPolicy = (data) => {
    return axios.post(`/api/create-new-policy`, data)
}
const getAllPolicy = () => {
    return axios.get(`/api/get-all-policy`)
}

const getLimitPolicy = () => {
    return axios.get(`/api/get-limit-policy`)
}
const deletePolicyService = (policyId) => {
    return axios.delete('/api/delete-policy', {
        data: {
            id: policyId
        }
    });
}
const editPolicyService = (inputData) => {
    return axios.put('/api/edit-policy', inputData);
}
const getDetailPolicyById = (data) => {
    return axios.get(`/api/get-all-detail-policy-by-id?id=${data.id}`)
}

const createNewHandbook = (data) => {
    return axios.post(`/api/create-new-handBook`, data)
}
const getAllHandBook = () => {
    return axios.get(`/api/get-all-handbook`)
}

const getTopHandbookHomeService = (limit) => {
    return axios.get(`/api/top-handbook-home?limit=${limit}`)
}
const deleteHandbookService = (handBookId) => {
    return axios.delete('/api/delete-handbook', {
        data: {
            id: handBookId
        }
    });
}
const editHandBookService = (inputData) => {
    return axios.put('/api/edit-handbook', inputData);
}
const getDetailHandBookById = (data) => {
    return axios.get(`/api/get-all-detail-handbook-by-id?id=${data.id}`)
}

const createNewClinics = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}

const getClinic = () => {
    return axios.get(`/api/get-all-category-clinic`)
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-all-detail-clinic-by-id?id=${data.id}`)
}
const deleteClinicService = (clinicId) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: clinicId
        }
    });
}
const editClinicService = (inputData) => {
    return axios.put('/api/edit-clinic', inputData);
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}

const getScheduleByDate = (data) => {
    return axios.get(`/api/get-list-schedule-by-date?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

const postSendCancelBooking = (data) => {
    return axios.post(`/api/cancelAppointment`, data)
}

const createNewCategoryHandbook = (data) => {
    return axios.post(`/api/create-new-categoryHandBook`, data)
}
const getAllCategoryHandbook = () => {
    return axios.get(`/api/get-all-categoryHandBook`)
}
const deleteCategoryHandbookService = (categoryId) => {
    return axios.delete('/api/delete-categoryHandBook', {
        data: {
            id: categoryId
        }
    });
}
const editCategoryHandbookService = (inputData) => {
    return axios.put('/api/edit-categoryHandBook', inputData);
}
const getDetailCategoryById = (data) => {
    return axios.get(`/api/get-all-detail-category-by-id?id=${data.id}`)
}

const createNewQuestion = (data) => {
    return axios.post(`/api/create-new-questions`, data)
}

const getAllQuestion = () => {
    return axios.get(`/api/get-all-question`)
}

const deleteQuestion = (questionId) => {
    return axios.delete('/api/delete-question', {
        data: {
            id: questionId
        }
    });
}

const editQuestion = (inputData) => {
    return axios.put('/api/edit-question', inputData);
}

const getAllContact = () => {
    return axios.get(`/api/get-all-contact`)
}

const deleteContact = (contactId) => {
    return axios.delete('/api/delete-contact', {
        data: {
            id: contactId
        }
    });
}

export const updateDoctorImage = async (id, file) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', file);

    try {
        await axios.put('/api/profile/update-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

let forgotPassword = async (email) => {
    try {
        const response = await axios.post('/api/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

let resetPassword = async (resetToken, newPassword) => {
    try {
        const response = await axios.post('/api/reset-password', { resetToken, newPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService,
    getAllCodeService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,
    getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate, getExtraInforDoctorById
    , getProfileDoctorById, postPatientBookAppointment, postVerifyBookAppointment, createNewSpecialty,
    getAllSpecialty, getSpecialty, getDetailSpecialtyById, createNewClinics, getAllClinic, getDetailClinicById, getClinic,
    getAllPatientForDoctor, postSendRemedy, deleteClinicService, deleteSpecialtyService, deleteDoctorService, saveScheduleDoctor,
    editClinicService, editSpecialtyService, createNewHandbook, getAllHandBook, deleteHandbookService, getAllSchedule, getScheduleByDate,
    editHandBookService, getDetailHandBookById, createNewPolicy, getAllPolicy, getLimitPolicy, deletePolicyService,
    editPolicyService, getDetailPolicyById, createNewCategoryHandbook, getAllCategoryHandbook,
    deleteCategoryHandbookService, editCategoryHandbookService, getTopHandbookHomeService,
    getDetailCategoryById, createNewQuestion, getAllQuestion, deleteQuestion, editQuestion, getAllContact, deleteContact, forgotPassword, resetPassword, postSendCancelBooking, 
}
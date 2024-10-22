import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getAllSpecialty, getAllClinic,
    deleteClinicService, deleteSpecialtyService, deleteDoctorService, editClinicService, editSpecialtyService, getAllHandBook,
    deleteHandbookService, editHandBookService, getAllPolicy, deletePolicyService, editPolicyService, getAllContact,
    getAllCategoryHandbook, deleteCategoryHandbookService, editCategoryHandbookService,
    getTopHandbookHomeService, getAllQuestion, deleteQuestion, editQuestion, deleteContact
} from "../../services/userService";
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log(e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})




export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFaided());
            }
        } catch (e) {
            dispatch(fetchPositionFaided());
            console.log(e);
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})




export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFaided());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log(e);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            toast.success("Create a new user success!")
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(e);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse())) //reverse đảo user lên đầu khi add
            } else {
                dispatch(fetchAllUserFaided());
            }
        } catch (e) {
            dispatch(fetchAllUserFaided());
            console.log(e);
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFaided = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIDED
})



export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            toast.success("Delete the user success!")
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(deleteUserFaided());
            }
        } catch (e) {
            dispatch(deleteUserFaided());
            console.log(e);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFaided = () => ({
    type: actionTypes.DELETE_USER_FAILED
})



export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the user success!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(editUserFaided());
            }
        } catch (e) {
            dispatch(editUserFaided());
            console.log(e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFaided = () => ({
    type: actionTypes.EDIT_USER_FAILED
})




export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIDED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIDED,
            })
        }
    }
}



export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIDED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIDED,
            })
        }
    }
}


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save Infor Detail Doctor success!")
                dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS, })
                dispatch(fetchAllDoctor())
            } else {
                toast.error("Save Infor Detail Doctor Fail!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED,
                })
            }
        } catch (e) {
            toast.error("Save Infor Detail Doctor Fail!");
            console.log(e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED,
            })
        }
    }
}
export const deleteDoctor = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteDoctorService(doctorId);
            if (res && res.errCode === 0) {
                toast.success("Delete the doctor success!")
                dispatch(deleteDoctorSuccess())
                dispatch(fetchAllDoctor())
            } else {
                toast.error("Delete the doctor failed!")
                dispatch(deleteDoctorFaided());
            }
        } catch (e) {
            dispatch(deleteDoctorFaided());
            console.log(e);
        }
    }
}
export const deleteDoctorSuccess = () => ({
    type: actionTypes.FETCH_DELETE_DOCTOR_SUCCESS,
})
export const deleteDoctorFaided = () => ({
    type: actionTypes.FETCH_DELETE_DOCTOR_FAIDED
})




export const fetchAllSchedule = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAIDED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAIDED,
            })
        }
    }
}



export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resCLinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resCLinic && resCLinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resCLinic: resCLinic.data,
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFaided());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFaided());
            console.log(e);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFaided = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED
})

export const fetchAllPolicyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPolicy();
            if (res && res.errCode === 0) {
                dispatch(fetchAllPolicySuccess(res.data.reverse()))
            } else {
                dispatch(fetchAllPolicyFailed());
            }
        } catch (e) {
            dispatch(fetchAllPolicyFailed());
            console.log(e);
        }
    }
}
export const fetchAllPolicySuccess = (data) => ({
    type: 'FETCH_ALL_POLICY_SUCCESS',
    policies: data
})
export const fetchAllPolicyFailed = () => ({
    type: 'FETCH_ALL_POLICY_FAIDED'
})

export const deletePolicy = (policyId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deletePolicyService(policyId);
            if (res && res.errCode === 0) {
                toast.success("Delete the policy success!")
                dispatch(deletePolicySuccess())
                dispatch(fetchAllPolicyStart())
            } else {
                toast.error("Delete the policy failed!")
                dispatch(deletePolicyFaided());
            }
        } catch (e) {
            dispatch(deletePolicyFaided());
            console.log(e);
        }
    }
}
export const deletePolicySuccess = () => ({
    type: actionTypes.FETCH_DELETE_POLICY_SUCCESS,
})
export const deletePolicyFaided = () => ({
    type: actionTypes.FETCH_DELETE_POLICY_FAIDED
})

export const editPolicy = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editPolicyService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the policy success!")
                dispatch(editPolicySuccess())
                dispatch(fetchAllPolicyStart())
            } else {
                toast.error("Edit the policy failed!")
                dispatch(editPolicyFailed());
            }
        } catch (e) {
            dispatch(editPolicyFailed());
            toast.error("Edit the policy failed!")
            console.log(e);
        }
    }
}
export const editPolicySuccess = () => ({
    type: actionTypes.EDIT_POLICY_SUCCESS,
})
export const editPolicyFailed = () => ({
    type: actionTypes.EDIT_POLICY_FAILED
})

export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.data.reverse()))
            } else {
                dispatch(fetchAllClinicFailed());
            }
        } catch (e) {
            dispatch(fetchAllClinicFailed());
            console.log(e);
        }
    }
}
export const fetchAllClinicSuccess = (data) => ({
    type: 'FETCH_ALL_CLINIC_SUCCESS',
    clinics: data
})
export const fetchAllClinicFailed = () => ({
    type: 'FETCH_ALL_CLINIC_FAIDED'
})

export const deleteClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinicService(clinicId);
            if (res && res.errCode === 0) {
                toast.success("Delete the clinic success!")
                dispatch(deleteClinicSuccess())
                dispatch(fetchAllClinicStart())
            } else {
                toast.error("Delete the clinic failed!")
                dispatch(deleteClinicFaided());
            }
        } catch (e) {
            dispatch(deleteClinicFaided());
            console.log(e);
        }
    }
}
export const deleteClinicSuccess = () => ({
    type: actionTypes.FETCH_DELETE_CLINIC_SUCCESS,
})
export const deleteClinicFaided = () => ({
    type: actionTypes.FETCH_DELETE_CLINIC_FAIDED
})

export const editClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editClinicService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the clinic success!")
                dispatch(editClinicSuccess())
                dispatch(fetchAllClinicStart())
            } else {
                toast.error("Edit the clinic failed!")
                dispatch(editClinicFailed());
            }
        } catch (e) {
            dispatch(editClinicFailed());
            console.log(e);
        }
    }
}
export const editClinicSuccess = () => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS,
})
export const editClinicFailed = () => ({
    type: actionTypes.EDIT_CLINIC_FAILED
})


export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.data.reverse()))
            } else {
                dispatch(fetchAllSpecialtyFailed());
            }
        } catch (e) {
            dispatch(fetchAllSpecialtyFailed());
            console.log(e);
        }
    }
}
export const fetchAllSpecialtySuccess = (data) => ({
    type: 'FETCH_ALL_SPECIALTY_SUCCESS',
    specialty: data
})
export const fetchAllSpecialtyFailed = () => ({
    type: 'FETCH_ALL_SPECIALTY_FAIDED'
})

export const deleteSpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSpecialtyService(specialtyId);
            if (res && res.errCode === 0) {
                toast.success("Delete the specialty success!")
                dispatch(deleteSpecialtySuccess())
                dispatch(fetchAllSpecialtyStart())
            } else {
                toast.error("Delete the clinic failed!")
                dispatch(deleteSpecialtyFaided());
            }
        } catch (e) {
            dispatch(deleteSpecialtyFaided());
            console.log(e);
        }
    }
}
export const deleteSpecialtySuccess = () => ({
    type: actionTypes.FETCH_DELETE_SPECIALTY_SUCCESS,
})
export const deleteSpecialtyFaided = () => ({
    type: actionTypes.FETCH_DELETE_SPECIALTY_FAIDED
})


export const editSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the specialty success!")
                dispatch(editSpecialtySuccess())
                dispatch(fetchAllSpecialtyStart())
            } else {
                toast.error("Edit the specialty failed!")
                dispatch(editSpecialtyFailed());
            }
        } catch (e) {
            dispatch(editSpecialtyFailed());
            console.log(e);
        }
    }
}
export const editSpecialtySuccess = () => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS,
})
export const editSpecialtyFailed = () => ({
    type: actionTypes.EDIT_SPECIALTY_FAILED
})


export const fetchAllHandBookStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllHandBook();
            if (res && res.errCode === 0) {
                dispatch(fetchAllHandBookSuccess(res.data.reverse()))
            } else {
                dispatch(fetchAllHandBookFailed());
            }
        } catch (e) {
            dispatch(fetchAllHandBookFailed());
            console.log(e);
        }
    }
}
export const fetchAllHandBookSuccess = (data) => ({
    type: 'FETCH_ALL_HANDBOOK_SUCCESS',
    specialty: data
})
export const fetchAllHandBookFailed = () => ({
    type: 'FETCH_ALL_HANDBOOK_FAIDED'
})

export const deleteHB = (handBookId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteHandbookService(handBookId);
            if (res && res.errCode === 0) {
                toast.success("Delete the handbook success!")
                dispatch(deleteHandbookSuccess())
                dispatch(fetchAllHandBookStart())
            } else {
                toast.error("Delete the handbook failed!")
                dispatch(deleteHandbookFaided());
            }
        } catch (e) {
            dispatch(deleteHandbookFaided());
            console.log(e);
        }
    }
}
export const deleteHandbookSuccess = () => ({
    type: actionTypes.FETCH_DELETE_HANDBOOK_SUCCESS,
})
export const deleteHandbookFaided = () => ({
    type: actionTypes.FETCH_DELETE_HANDBOOK_FAIDED
})

export const editHandBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editHandBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the handbook success!")
                dispatch(editHandbookSuccess())
                dispatch(fetchAllHandBookStart())
            } else {
                toast.error("Edit the handbook failed!")
                dispatch(editHandbookFailed());
            }
        } catch (e) {
            dispatch(editHandbookFailed());
            console.log(e);
        }
    }
}
export const editHandbookSuccess = () => ({
    type: actionTypes.EDIT_HANDBOOK_SUCCESS,
})
export const editHandbookFailed = () => ({
    type: actionTypes.EDIT_HANDBOOK_FAILED
})

export const fetchAllCategoryHBStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCategoryHandbook();
            if (res && res.errCode === 0) {
                dispatch(fetchAllCategoryHandbookSuccess(res.data.reverse()))
            } else {
                dispatch(fetchAllCategoryHandbookFailed());
            }
        } catch (e) {
            dispatch(fetchAllClinicFailed());
            console.log(e);
        }
    }
}
export const fetchAllCategoryHandbookSuccess = (data) => ({
    type: 'FETCH_ALL_CATEGORY_HANDBOOK_SUCCESS',
    category: data
})
export const fetchAllCategoryHandbookFailed = () => ({
    type: 'FETCH_ALL_CATEGORY_HANDBOOK_FAIDED'
})

export const fetchTopHandbook = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopHandbookHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_HANDBOOK_SUCCESS,
                    topHandbook: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_HANDBOOK_FAIDED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_HANDBOOK_FAIDED,
            })
        }
    }
}

export const deleteCategoryHB = (categoryId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCategoryHandbookService(categoryId);
            if (res && res.errCode === 0) {
                toast.success("Delete the category success!")
                dispatch(deleteCategoryHandbookSuccess())
                dispatch(fetchAllCategoryHBStart())
            } else {
                toast.error("Delete the category failed!")
                dispatch(deleteCategoryHandbookFaided());
            }
        } catch (e) {
            dispatch(deleteCategoryHandbookFaided());
            toast.error("Delete the category failed!");
            console.log(e);
        }
    }
}
export const deleteCategoryHandbookSuccess = () => ({
    type: actionTypes.FETCH_DELETE_CATEGORY_SUCCESS,
})
export const deleteCategoryHandbookFaided = () => ({
    type: actionTypes.FETCH_DELETE_CATEGORY_FAIDED
})

export const editCategoryHandBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCategoryHandbookService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the category handbook success!")
                dispatch(editCategoryHandbookSuccess())
                dispatch(fetchAllCategoryHBStart())
            } else {
                toast.error("Edit the category handbook failed!")
                dispatch(editCategoryHandbookFailed());
            }
        } catch (e) {
            dispatch(editCategoryHandbookFailed());
            console.log(e);
        }
    }
}
export const editCategoryHandbookSuccess = () => ({
    type: actionTypes.EDIT_CATEGORY_SUCCESS,
})
export const editCategoryHandbookFailed = () => ({
    type: actionTypes.EDIT_CATEGORY_FAILED
})


export const fetchAllQuestion = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllQuestion();
            if (res && res.errCode === 0) {
                dispatch(fetchAllQuestionSuccess(res.data))
            } else {
                dispatch(fetchAllQuestionFailed());
            }
        } catch (e) {
            dispatch(fetchAllQuestionFailed());
            console.log(e);
        }
    }
}
export const fetchAllQuestionSuccess = (data) => ({
    type: 'FETCH_ALL_QUESTION_SUCCESS',
    question: data
})
export const fetchAllQuestionFailed = () => ({
    type: 'FETCH_ALL_QUESTION_FAIDED'
})


export const deleteQuestions = (questionId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteQuestion(questionId);
            if (res && res.errCode === 0) {
                toast.success("Delete the question success!")
                dispatch(deleteQuestionSuccess())
                dispatch(fetchAllQuestion())
            } else {
                toast.error("Delete the question failed!")
                dispatch(deleteQuestionFaided());
            }
        } catch (e) {
            dispatch(deleteQuestionFaided());
            toast.error("Delete the question failed!");
            console.log(e);
        }
    }
}
export const deleteQuestionSuccess = () => ({
    type: actionTypes.FETCH_DELETE_QUESTION_SUCCESS,
})
export const deleteQuestionFaided = () => ({
    type: actionTypes.FETCH_DELETE_QUESTION_FAIDED
})


export const editQuestions = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editQuestion(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the question success!")
                dispatch(editQuestionSuccess())
                dispatch(fetchAllQuestion())
            } else {
                toast.error("Edit the question failed!")
                dispatch(editQuestionFailed());
            }
        } catch (e) {
            dispatch(editQuestionFailed());
            console.log(e);
        }
    }
}
export const editQuestionSuccess = () => ({
    type: actionTypes.EDIT_QUESTION_SUCCESS,
})
export const editQuestionFailed = () => ({
    type: actionTypes.EDIT_QUESTION_FAILED
})


export const fetchAllContact = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllContact();
            if (res && res.errCode === 0) {
                dispatch(fetchAllContactSuccess(res.data))
            } else {
                dispatch(fetchAllContactFailed());
            }
        } catch (e) {
            dispatch(fetchAllContactFailed());
            console.log(e);
        }
    }
}
export const fetchAllContactSuccess = (data) => ({
    type: 'FETCH_ALL_CONTACT_SUCCESS',
    contact: data
})
export const fetchAllContactFailed = () => ({
    type: 'FETCH_ALL_CONTACT_FAIDED'
})


export const deleteContacts = (contactId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteContact(contactId);
            if (res && res.errCode === 0) {
                toast.success("Delete the contact success!")
                dispatch(deleteContactSuccess())
                dispatch(fetchAllContact())
            } else {
                toast.error("Delete the contact failed!")
                dispatch(deleteContactFaided());
            }
        } catch (e) {
            dispatch(deleteContactFaided());
            toast.error("Delete the contact failed!");
            console.log(e);
        }
    }
}
export const deleteContactSuccess = () => ({
    type: actionTypes.FETCH_DELETE_CONTACT_SUCCESS,
})
export const deleteContactFaided = () => ({
    type: actionTypes.FETCH_DELETE_CONTACT_FAIDED
})
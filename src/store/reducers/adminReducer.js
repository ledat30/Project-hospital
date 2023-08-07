import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    topHandbook: [],
    allDoctors: [],
    allScheduleTime: [],
    clinics: [],
    specialty: [],
    handbook: [],
    policies: [],
    category: [],
    question: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyStatE = { ...state };
            copyStatE.isLoadingGender = true;
            return {
                ...copyStatE,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            let copySTate = { ...state };
            copySTate.genders = [];
            copySTate.isLoadingGender = false;
            return {
                ...copySTate,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_FAIDED:
            state.users = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIDED:
            state.topDoctors = [];
            return {
                ...state,
            }


        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIDED:
            state.allDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAIDED:
            state.allScheduleTime = [];
            return {
                ...state,
            }


        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.clinics = action.clinics;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINIC_FAIDED:
            state.clinics = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_POLICY_SUCCESS:
            state.policies = action.policies;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_POLICY_FAIDED:
            state.policies = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.specialty = action.specialty;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAIDED:
            state.specialty = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.handbook = action.specialty;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_HANDBOOK_FAIDED:
            state.handbook = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_HANDBOOK_SUCCESS:
            state.topHandbook = action.topHandbook;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_HANDBOOK_FAIDED:
            state.topHandbook = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CATEGORY_HANDBOOK_SUCCESS:
            state.category = action.category;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CATEGORY_HANDBOOK_FAIDED:
            state.category = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_QUESTION_SUCCESS:
            state.question = action.question;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_QUESTION_FAIDED:
            state.question = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;
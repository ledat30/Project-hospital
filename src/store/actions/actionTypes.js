const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',


    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIDED: 'FETCH_GENDER_FAIDED',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIDED: 'FETCH_POSITION_FAIDED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIDED: 'FETCH_ROLE_FAIDED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAIDED: 'FETCH_ALL_USERS_FAIDED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAIDED: 'FETCH_TOP_DOCTOR_FAIDED',

    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAIDED: 'FETCH_ALL_DOCTOR_FAIDED',

    FETCH_DELETE_DOCTOR_SUCCESS: 'FETCH_DELETE_DOCTOR_SUCCESS',
    FETCH_DELETE_DOCTOR_FAIDED: 'FETCH_DELETE_DOCTOR_FAIDED',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAIDED: 'SAVE_DETAIL_DOCTOR_FAIDED',

    FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_HOURS_FAIDED: 'FETCH_ALLCODE_SCHEDULE_HOURS_FAIDED',


    FETCH_REQUIRED_DOCTOR_INFOR_START: 'FETCH_REQUIRED_DOCTOR_INFOR_START',
    FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: 'FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS',
    FETCH_REQUIRED_DOCTOR_INFOR_FAIDED: 'FETCH_REQUIRED_DOCTOR_INFOR_FAIDED',

    FETCH_ALL_CLINIC_SUCCESS: 'FETCH_ALL_CLINIC_SUCCESS',
    FETCH_ALL_CLINIC_FAIDED: 'FETCH_ALL_CLINIC_FAIDED',

    EDIT_CLINIC_SUCCESS: 'EDIT_CLINIC_SUCCESS',
    EDIT_CLINIC_FAILED: 'EDIT_CLINIC_FAILED',

    FETCH_DELETE_CLINIC_SUCCESS: 'FETCH_DELETE_CLINIC_SUCCESS',
    FETCH_DELETE_CLINIC_FAIDED: 'FETCH_DELETE_CLINIC_FAIDED',

    FETCH_ALL_SPECIALTY_SUCCESS: 'FETCH_ALL_SPECIALTY_SUCCESS',
    FETCH_ALL_SPECIALTY_FAIDED: 'FETCH_ALL_SPECIALTY_FAIDED',

    FETCH_ALL_HANDBOOK_SUCCESS: 'FETCH_ALL_HANDBOOK_SUCCESS',
    FETCH_ALL_HANDBOOK_FAIDED: 'FETCH_ALL_HANDBOOK_FAIDED',

    FETCH_DELETE_HANDBOOK_SUCCESS: 'FETCH_DELETE_HANDBOOK_SUCCESS',
    FETCH_DELETE_HANDBOOK_FAIDED: 'FETCH_DELETE_HANDBOOK_FAIDED',

    EDIT_HANDBOOK_SUCCESS: 'EDIT_HANDBOOK_SUCCESS',
    EDIT_HANDBOOK_FAILED: 'EDIT_HANDBOOK_FAILED',

    FETCH_TOP_HANDBOOK_SUCCESS: 'FETCH_TOP_HANDBOOK_SUCCESS',
    FETCH_TOP_HANDBOOK_FAIDED: 'FETCH_TOP_HANDBOOK_FAIDED',


    FETCH_ALL_POLICY_SUCCESS: 'FETCH_ALL_POLICY_SUCCESS',
    FETCH_ALL_POLICY_FAIDED: 'FETCH_ALL_POLICY_FAIDED',

    FETCH_DELETE_POLICY_SUCCESS: 'FETCH_DELETE_POLICY_SUCCESS',
    FETCH_DELETE_POLICY_FAIDED: 'FETCH_DELETE_POLICY_FAIDED',

    EDIT_POLICY_SUCCESS: 'EDIT_POLICY_SUCCESS',
    EDIT_POLICY_FAILED: 'EDIT_POLICY_FAILED',

    FETCH_DELETE_SPECIALTY_SUCCESS: 'FETCH_DELETE_SPECIALTY_SUCCESS',
    FETCH_DELETE_SPECIALTY_FAIDED: 'FETCH_DELETE_SPECIALTY_FAIDED',

    EDIT_SPECIALTY_SUCCESS: 'EDIT_SPECIALTY_SUCCESS',
    EDIT_SPECIALTY_FAILED: 'EDIT_SPECIALTY_FAILED',

    FETCH_ALL_CATEGORY_HANDBOOK_SUCCESS: 'FETCH_ALL_CATEGORY_HANDBOOK_SUCCESS',
    FETCH_ALL_CATEGORY_HANDBOOK_FAIDED: 'FETCH_ALL_CATEGORY_HANDBOOK_FAIDED',

    FETCH_DELETE_CATEGORY_SUCCESS: 'FETCH_DELETE_CATEGORY_SUCCESS',
    FETCH_DELETE_CATEGORY_FAIDED: 'FETCH_DELETE_CATEGORY_FAIDED',

    EDIT_CATEGORY_SUCCESS: 'EDIT_CATEGORY_SUCCESS',
    EDIT_CATEGORY_FAILED: 'EDIT_CATEGORY_FAILED',

    FETCH_ALL_QUESTION_SUCCESS: 'FETCH_ALL_QUESTION_SUCCESS',
    FETCH_ALL_QUESTION_FAIDED: 'FETCH_ALL_QUESTION_FAIDED',

    FETCH_DELETE_QUESTION_SUCCESS: 'FETCH_DELETE_QUESTION_SUCCESS',
    FETCH_DELETE_QUESTION_FAIDED: 'FETCH_DELETE_QUESTION_FAIDED',

    EDIT_QUESTION_SUCCESS: 'EDIT_QUESTION_SUCCESS',
    EDIT_QUESTION_FAILED: 'EDIT_QUESTION_FAILED',


    FETCH_ALL_CONTACT_SUCCESS: 'FETCH_ALL_CONTACT_SUCCESS',
    FETCH_ALL_CONTACT_FAIDED: 'FETCH_ALL_CONTACT_FAIDED',

    FETCH_DELETE_CONTACT_SUCCESS: 'FETCH_DELETE_CONTACT_SUCCESS',
    FETCH_DELETE_CONTACT_FAIDED: 'FETCH_DELETE_CONTACT_FAIDED',

})

export default actionTypes;
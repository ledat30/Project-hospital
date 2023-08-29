import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';
import handBookController from '../controllers/handBookController';
import policyController from '../controllers/policyController';
import questionController from '../controllers/questionController';
import searchHomePageController from '../controllers/searchHomePageController';

let router = express.Router();

let initWebRouter = (app) => {
    //rest api
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.post('/post-crud', homeController.postCrud);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.postDelete);

    router.post('/api/login', userController.handleLoging);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.createHandleCreateNewUser);
    router.put('/api/edit-user', userController.HandleEditUser);
    router.delete('/api/delete-user', userController.HandleDeleteUser);
    router.get('/api/search-user', userController.search);

    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.delete('/api/delete-doctor', doctorController.HandleDeleteDoctor);

    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.post('/api/bulk-create-schedule-doctor', doctorController.CreateScheduleDoctor);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api/get-extra-infor-by-id', doctorController.getExtraInfforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.get('/api/search-doctor-web', doctorController.searchDoctor);
    router.get('/api/search-doctor-admin', doctorController.search);

    router.get('/api/getAllSchedule', doctorController.getAllSchedule);
    router.get('/api/search-schedule', doctorController.searchSchedule);
    router.get('/api/get-list-schedule-by-date', doctorController.getListScheduleByDate);

    router.get('/api/get-list-patient', doctorController.getListPatientForDoctor);
    router.post('/api/send-remedy', doctorController.sendRemedy);

    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-all-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    router.delete('/api/delete-specialty', specialtyController.HandleDeleteSpecialty);
    router.put('/api/edit-specialty', specialtyController.HandleEditSpecialty);
    router.get('/api/get-all-category-specialty', specialtyController.getSpecialty);
    router.get('/api/search-specialty', specialtyController.search)
    router.get('/api/search-specialty-web', specialtyController.searchSpecialty);

    router.post('/api/create-new-clinic', clinicController.createClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.get('/api/get-all-detail-clinic-by-id', clinicController.getDetailClinicById);
    router.put('/api/edit-clinic', clinicController.HandleEditClinic);
    router.delete('/api/delete-clinic', clinicController.HandleDeleteClinic);
    router.get('/api/get-all-category-clinic', clinicController.getClinic);
    router.get('/api/search-clinic', clinicController.search);
    router.get('/api/search-clinic-web', clinicController.searchClinic);

    router.post('/api/create-new-categoryHandBook', handBookController.createCategoryHandbook);
    router.get('/api/get-all-categoryHandBook', handBookController.getAllCategory);
    router.delete('/api/delete-categoryHandBook', handBookController.HandleDeleteCategoryHB);
    router.put('/api/edit-categoryHandBook', handBookController.HandleEditCategoryHB);
    router.get('/api/get-all-detail-category-by-id', handBookController.getDetailCategoryById);
    router.get('/api/search-category', handBookController.searchCategory);

    router.post('/api/create-new-handBook', handBookController.createHandbook);
    router.get('/api/top-handbook-home', handBookController.getTopHandbookHome);
    router.get('/api/get-all-handbook', handBookController.getAllHandBook);
    router.delete('/api/delete-handbook', handBookController.HandleDeleteHB);
    router.put('/api/edit-handbook', handBookController.HandleEditHB);
    router.get('/api/get-all-detail-handbook-by-id', handBookController.getDetailHandBookById);
    router.get('/api/search-handbook', handBookController.searchHandBook);
    router.get('/api/search-handbook-web', handBookController.search);

    router.post('/api/create-new-policy', policyController.createPolicy);
    router.get('/api/get-all-policy', policyController.getAllPolicy);
    router.delete('/api/delete-policy', policyController.HandleDeletePolicy);
    router.put('/api/edit-policy', policyController.HandleEditPolicy);
    router.get('/api/get-all-detail-policy-by-id', policyController.getDetailPolicyById);
    router.get('/api/search-policy', policyController.search);
    router.get('/api/get-limit-policy', policyController.getLimitPolicy);
    router.get('/api/search-policy-web', policyController.searchPolicy);


    router.post('/api/create-new-questions', questionController.createQuestion);
    router.get('/api/get-all-question', questionController.getAllQuestion);
    router.get('/api/search-question', questionController.search);
    router.delete('/api/delete-question', questionController.HandleDeleteQuestion);
    router.put('/api/edit-question', questionController.HandleEditQuestion);

    router.get('/api/search-home-website', searchHomePageController.searchHomePage);
    return app.use("/", router);
}
module.exports = initWebRouter;


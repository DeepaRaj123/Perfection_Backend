const express = require('express');
const {getEnquiries,getAllEnquiries,postEnquiries,patchEnquiries,deleteEnquiry,sendMessage,showwelcomeMessage} = require('../controllers/enquiryController');
const AuthMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/getEnquiries', getEnquiries);
router.get('/getAllEnquiries', getAllEnquiries);
router.post('/postEnquiries', postEnquiries);
router.patch('/patchEnquiries/:id', patchEnquiries);
router.delete('/deleteEnquiry/:id', deleteEnquiry);

router.post('/sendMessage', sendMessage);

router.get('/', showwelcomeMessage);

module.exports = {
    routes: router
}
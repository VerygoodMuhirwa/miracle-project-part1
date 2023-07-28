const { Router } = require('express');
const { getMyProfile, editProfile, deleteProfile,updateProfile, addSingleProfile } = require('../controllers/profileController');
const { isAuth } = require('../middlewares/verifyToken');

const authRoutes = Router();

authRoutes.get('/getMyProfile', isAuth,  getMyProfile);
authRoutes.post('/editProfile', isAuth,  editProfile);
authRoutes.delete("/deleteProfile/:id", isAuth, deleteProfile)
authRoutes.put("/updateProfile/:id", isAuth, updateProfile);
authRoutes.post("/addSingleProfile/:field",isAuth, addSingleProfile )

module.exports = authRoutes;
  

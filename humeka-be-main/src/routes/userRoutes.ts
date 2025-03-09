import {changePassword, editProfile, getAllCounselors, getOwnProfile, recommendSupportGroup} from "../controllers/userController";
import { Router } from "express";
import { isLoggedIn } from "../middleware/authenticate";
import { validateChangePassword, validateEditProfile } from "../middleware/validation/authSchema";
import { validateQuestionnaireSchema } from "../middleware/validation/userSchema";


const userRouter = Router()

userRouter.use(isLoggedIn)

userRouter.get('/profile', getOwnProfile)
userRouter.get('/counselors', getAllCounselors)
userRouter.post('/change_pass', validateChangePassword, changePassword)
userRouter.patch('/', validateEditProfile, editProfile)
userRouter.post('/questionnaire', validateQuestionnaireSchema, recommendSupportGroup)


export default userRouter
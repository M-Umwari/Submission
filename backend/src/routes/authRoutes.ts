import {signUp, login} from '../controllers/userController'
import { Router } from "express";
import { validateLogin, validateSignup } from "../middleware/validation/authSchema";


const authRouter = Router()


authRouter.post('/signup', validateSignup, signUp)
authRouter.post('/login', validateLogin, login)


export default authRouter
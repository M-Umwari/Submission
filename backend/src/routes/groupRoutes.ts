import { Router } from "express";
import {GroupController} from '../controllers/groupController'
import { isLoggedIn } from "../middleware/authenticate";

const router = Router()
router.use(isLoggedIn)

router.get('/', GroupController.getGroups)
router.post("/", GroupController.createGroup)
router.post("/join", GroupController.joinGroup)
router.post("/leave", GroupController.leaveGroup)

export default router
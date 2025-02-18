import { Router } from "express";
import { loginUser ,verifyUser,myProfile} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";



const router = Router();

router.post("/login", loginUser)
router.post("/verify", verifyUser)
router.get("/profile",isAuth, myProfile)

export default router;
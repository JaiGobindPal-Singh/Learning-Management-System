import { Router } from "express";
import { loginStudent, refreshStudentToken }  from "../controllers/student.controller.js";
const router = Router();

router.post("/login", loginStudent);
router.get("/refresh-token", refreshStudentToken);

export default router;
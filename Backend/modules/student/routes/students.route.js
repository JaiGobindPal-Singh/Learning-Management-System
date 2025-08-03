import { Router } from "express";
import { authenticateStudent, loginStudent, refreshStudentToken,getAnnouncements }  from "../controllers/student.controller.js";
const router = Router();

//routes related to authentication
router.post("/login", loginStudent);
router.get("/refresh-token", refreshStudentToken);

//other routes that require authentication
router.get("/announcements",authenticateStudent,getAnnouncements)
export default router;
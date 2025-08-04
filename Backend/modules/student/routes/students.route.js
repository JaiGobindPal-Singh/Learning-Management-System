import { Router } from "express";
import { authenticateStudent, loginStudent, refreshStudentToken, getAnnouncements, getClassGroupMessages }  from "../controllers/student.controller.js";
const router = Router();

//routes related to authentication
router.post("/login", loginStudent);
router.get("/refresh-token", refreshStudentToken);

//other routes that require authentication
router.get("/announcements",authenticateStudent,getAnnouncements)
router.get("/group-messages", authenticateStudent, getClassGroupMessages);
export default router;
/**
 * @fileoverview student routes
 * This file defines the routes for student-related operations such as login, token refresh, fetching announcements, class group messages, study materials, and assignments.
 */

import { Router } from "express";
import {
     askAI,
     authenticateStudent,
     loginStudent,
     refreshStudentToken,
     getAnnouncements,
     getClassGroupMessages,
     getStudyMaterial,
     getAssignments
} from "../controllers/student.controller.js";


const router = Router();

//authentication routes
router.post("/login", loginStudent);
router.get("/refresh-token", refreshStudentToken);

//other routes that require authentication
router.get("/announcements", authenticateStudent, getAnnouncements);
router.get("/group-messages", authenticateStudent, getClassGroupMessages);
router.get("/study-materials", authenticateStudent, getStudyMaterial);
router.get("/assignments", authenticateStudent, getAssignments);
// AI Teacher route
router.post("/ask-ai",authenticateStudent,askAI)
export default router;
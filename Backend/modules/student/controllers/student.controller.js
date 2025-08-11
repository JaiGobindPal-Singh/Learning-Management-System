/**
 * @fileoverview Student Controller Module
 * Contains functions for handling student-related operations such as login, token refresh, fetching announcements, class group messages, study materials, and assignments.
 */

// reexport the auth functions for use in routes
export { loginStudent, refreshStudentToken, authenticateStudent } from "../features/authentication/studentAuth.js";
import announcementsModel from "../../../db/models/announcements.model.js";
import classesModel from "../../../db/models/classes.model.js";
import geminiApi from "../features/AITeacher/gemini.js";

/**getAnnouncements function
 * this function fetches all announcements from the database
 * It retrieves the announcements, sorts them by time in descending order based on the time they were created,
 * @returns announcements in the response
 * @If no announcements are found, it returns a 404 status with an appropriate message.
 */
export const getAnnouncements = async (req, res) => {
     try {
          // Fetch all announcements from the database
          const announcements = await announcementsModel.find().sort({ time: -1 }).lean();
          if (!announcements || announcements.length === 0) {
               return res.status(404).json({ message: "No announcements found" });
          }
          // Return the announcements in the response
          return res.status(200).json({
               message: "Announcements fetched successfully",
               announcements: announcements
          });
     } catch (e) {
          console.error("Error fetching announcements:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}

/** getClassGroupMessages function
 * this function retrieves the class group for a student based on their class and semester.
 * it finds the class details in the classes collection using the student's class,
 * then it searches for the specific semester within that class to get the class group.
 * 
 * @returns the class group messages
 * @if the class or semester is not found, it returns a 404 status with an appropriate message.
 */
export const getClassGroupMessages = async (req, res) => {
     try {
          //get the student details from the req 
          const { studentDetails } = req;
          const studentClass = await classesModel.findOne({ class: studentDetails.class }).lean();
          if (!studentClass) {
               return res.status(404).json({ message: "Class not found" });
          }
          //find the class group for the student's class and semester
          const classGroup = studentClass.semesters.find(semester => semester.semester == studentDetails.classSemester);
          if (!classGroup) {
               return res.status(404).json({ message: "Class group not found for the specified semester" });
          }

          return res.status(200).json({
               message: "Class group fetched successfully",
               groupMessages: classGroup.classGroup.messages
          });
     } catch (e) {
          console.error("Error fetching class group:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}

/** getStudyMaterial function
 * this function retrieves the study material for a student's class and semester.
 * It first fetches the class details from the classes collection using the student's class,
 * then it searches for the specific semester within that class to get the study material.
 * It returns the study material in the response.
 * @param {*} req 
 * @param {*} res 
 * @returns the study material for the student's class and semester
 * 
 */
export const getStudyMaterial = async (req, res) => {
     try{
          //get the student details from the req 
          const { studentDetails } = req;
          const studentClass = await classesModel.findOne({ class: studentDetails.class }).lean();
          if (!studentClass) {
               return res.status(404).json({ message: "Class not found" });
          }
          //find the study material for the student's class and semester
          const studentSemester = studentClass.semesters.find(sem => sem.semester == studentDetails.classSemester);
          if( !studentSemester || !studentSemester.studyMaterials) {
               return res.status(404).json({ message: "Study material not found for the specified semester" });
          }
          return res.status(200).json({
               message: "Study material fetched successfully",
               studyMaterial: studentSemester.studyMaterials
          });

          
     }catch(e){
          console.error("Error fetching study material:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}

/**getAssignments function
 * this function retrieves the assignments for a student's class and semester.
 * It first fetches the class details from the classes collection using the student's class,
 * then it searches for the specific semester within that class to get the assignments.
 * It returns the assignments in the response.
 * @param {*} req
 * @param {*} res
 * @returns the assignments for the student's class and semester
 */
export const getAssignments = async (req, res) => {
     try{
          //get the student details from the req 
          const { studentDetails } = req;
          const studentClass = await classesModel.findOne({ class: studentDetails.class }).lean();
          if (!studentClass) {
               return res.status(404).json({ message: "Class not found" });
          }
          //find student semester and assignments accordingly
          const studentSemester = studentClass.semesters.find(sem => sem.semester == studentDetails.classSemester);
          if( !studentSemester || !studentSemester.assignments) {
               return res.status(404).json({ message: "Study material not found for the specified semester" });
          }
          return res.status(200).json({
               message: "assignments fetched successfully",
               assignments: studentSemester.assignments
          });
     }catch(e){
          console.error("Error fetching assignments:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @description This function allows students to ask questions to the AI teacher.
 * It expects a question in the request body and uses the geminiApi function to get the answer from the AI teacher.
 * @returns {Object} JSON response with the answer from the AI teacher
 * 
 */
export const askAI = async (req, res) =>{
     try{
          const { question } = req.body;
          if (!question || question.trim() === "") {
               return res.status(400).json({ message: "Question cannot be empty" });
          }
          // Call the geminiApi function to get the response from the AI teacher
          const response = await geminiApi(question);
          if (!response) {
               return res.status(500).json({ message: "Failed to get response from AI teacher" });
          }

          return res.status(200).json({
               message: "Response from AI teacher",
               answer: response
          });
     }catch(e){
          console.error("Error in askAITeacher:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}

/**
 * @description This function retrieves the student details from the request object.
 * It is used to get the student details after authentication or after refresh page
 * @param {*} req 
 * @param {*} res 
 * @returns student details
 */
export const getStudentDetails = async (req, res) => {
     try{
          //get the student details from the req 
          const { studentDetails } = req;
          if (!studentDetails) {
               return res.status(404).json({ message: "Student not found" });
          }
          return res.status(200).json({
               message: "Student details fetched successfully",
               student: studentDetails
          });
     }catch(e){
          console.error("Error fetching student details:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}
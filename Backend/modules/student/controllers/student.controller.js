// reexport the auth functions for use in routes
export { loginStudent, refreshStudentToken, authenticateStudent } from "../features/authentication/studentAuth.js";
import announcementsModel from "../../../db/models/announcements.model.js";
import classesModel from "../../../db/models/classes.model.js";

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


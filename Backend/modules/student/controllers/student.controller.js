// reexport the auth functions for use in routes
export { loginStudent, refreshStudentToken, authenticateStudent } from "../features/authentication/studentAuth.js";
import announcementsModel from "../../../db/models/announcements.model.js";

/**getAnnouncements function
 * this function fetches all announcements from the database
 * It retrieves the announcements, sorts them by time in descending order based on the time they were created,
 * and returns them in the response.
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


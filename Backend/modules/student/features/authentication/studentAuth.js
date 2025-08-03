import studentsModel from "../../../../db/models/students.model.js";
import { jwtSign, jwtVerify } from "../../../../configs/jwt.config.js";
import { cookieOptions } from "../../../../configs/cookie.config.js";

/** loginStudent function 
 * This function handles the student login process.
 * It checks if the roll number and phone number are provided,
 * validates them against the database,
 * and generates a JWT token if the credentials are valid.
 * It then sets the token in a cookie and returns the student details.
 */

/**refreshStudentToken function
 * this function handles the token refresh process for students and the reloads the data
 * It checks if the student token is provided,
 * validates it,
 * and generates a new JWT token if the token is valid.
 * It then sets the new token in a cookie and returns the student details.
 * If the token is invalid or not provided, it returns an error response.
 */

/**AuthenticateStudent function
 * this function is a middleware that authenticates the student
 * by checking the student token in the cookies.
 * It verifies the token and checks if the student exists in the database.
 * If the student is authenticated, it sets the student details in the request object for further use
 */

export const loginStudent = async (req,res)=> {
     try{
          //get the roll number and phone number from request body
          const {rollNo, phone} = req.body;
          if(!rollNo || !phone){
               return res.status(400).json({message: "Roll number and phone number are required"});
          }
          //check if the student exists in the database and extract the student details
          //used the lean method for the optimization bcs we don't need the mongoose document methods here
          const student = await studentsModel.findOne({rollNo, phone}).lean();
          if(!student){
               return res.status(404).json({message: "Invalid roll number or phone number"});
          }
          //generate a JWT token with roll number and phone number
          //and set it in the cookie
          const token = await jwtSign({rollNo:rollNo, phone:phone});
          res.cookie("studentToken", token, cookieOptions);
          return res.status(200).json({
               message: "Login successful",
               student: {
                    name: student.name,
                    rollNo: student.rollNo,
                    email: student.email,
                    profilePicture: student.profilePicture,
                    phone: student.phone,
                    class: student.class,
                    classSemester:student.classSemester
               }
          });
     }catch(e){
          console.error("Error during student login:", e);
          return res.status(500).json({message: "Internal server error"});
     }
}
export const refreshStudentToken = async (req, res) => {
     try {
          //get the student token from cookies
          const studentToken = req.cookies?.studentToken;
          if (!studentToken) {
               return res.status(401).json({ message: "No token provided! Login again" });
          }
          //verify the token and extract rollNo and phone
          const { rollNo,phone} = await jwtVerify(studentToken);
          if (!rollNo || !phone) {
               return res.status(400).json({ message: "Invalid token! Login again" });
          }
          const student = await studentsModel.findOne({ rollNo, phone }).lean();
          if (!student) {
               return res.status(404).json({ message: "Invalid roll number or phone number" });
          }
          //generate a new token and set it in the cookie
          const token = await jwtSign({ rollNo: rollNo, phone: phone });
          res.cookie("studentToken", token, cookieOptions);
          return res.status(200).json({
               message: "Token refreshed successfully",
               student: {
                    name: student.name,
                    rollNo: student.rollNo,
                    email: student.email,
                    profilePicture: student.profilePicture,
                    phone: student.phone,
                    class: student.class,
                    classSemester: student.classSemester
               }
          });
     } catch (e) {
          console.error("Error during token refresh:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}
export const authenticateStudent = async (req, res, next) => {
     try {
          //get the student token from cookies
          const studentToken = req.cookies?.studentToken;
          if (!studentToken) {
               return res.status(401).json({ message: "No token provided! Login again" });
          }

          //verify the token
          const { rollNo, phone } = await jwtVerify(studentToken);
          if (!rollNo || !phone) {
               return res.status(400).json({ message: "Invalid token! Login again" });
          }

          //check if the student exists in the database
          const student = await studentsModel.findOne({ rollNo, phone });
          if (!student) {
               return res.status(404).json({ message: "Invalid roll number or phone number" });
          }

          //set the student details in the request object for further use
          req.studentDetails = student;
          next();
     } catch (e) {
          console.error("Error during student authentication:", e);
          return res.status(500).json({ message: "Internal server error" });
     }
}
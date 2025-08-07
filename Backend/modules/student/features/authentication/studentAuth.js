/**
 * @fileoverview Student Authentication Module
 * Contains functions for student login, token refresh, and authentication middleware
 */

import studentsModel from "../../../../db/models/students.model.js";
import { cookieOptions } from "../../../../configs/cookie.config.js";
import { 
     jwtSign,
     jwtVerify
     } from "../../../../configs/jwt.config.js";

/**
 * Handles student login authentication
 * 
 * Validates student credentials (roll number and phone number) against the database,
 * generates a JWT token upon successful authentication, and sets it in a secure cookie.
 * 
 * @async
 * @function loginStudent
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing login credentials
 * @param {Number} req.body.rollNo - Student's roll number
 * @param {Number} req.body.phone - Student's phone number
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with login status and student details
 * 
 * @throws {400} When roll number or phone number is missing
 * @throws {404} When student credentials are invalid
 * @throws {500} When internal server error occurs
 * 
 * @example
 * * Request body
 * {
 *   "rollNo": 2021001,
 *   "phone": 9876543210
 * }
 * 
 * * Success response
 * {
 *   "message": "Login successful",
 *   "student": {
 *     "name": "John Doe",
 *     "rollNo": 2021001,
 *     "email": "john@example.com",
 *      ... other student details
 *   }
 * }
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

/**
 * Refreshes student authentication token
 * Validates the existing student token from cookies, verifies the student's existence
 * in the database, and generates a new JWT token with extended expiration.
 * 
 * @async
 * @function refreshStudentToken
 * @param {Object} req - Express request object
 * @param {Object} req.cookies - Request cookies
 * @param {string} req.cookies.studentToken - Existing JWT token from cookie
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with refreshed token status and student details
 * 
 * @throws {401} When no token is provided
 * @throws {400} When token is invalid
 * @throws {404} When student is not found
 * @throws {500} When internal server error occurs
 * 
 * @example
 * * Success response
 * {
 *   "message": "Token refreshed successfully",
 *   "student": {
 *     "name": "John Doe",
 *     "rollNo": 2021001,
 *     * ... other student details
 *   }
 * }
 */
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

/**
 * Authentication middleware for student routes
 * 
 * Validates student JWT token from cookies, verifies student existence in database,
 * and attaches student details to the request object for use in subsequent middleware/routes.
 * 
 * @async
 * @function authenticateStudent
 * @param {Object} req - Express request object
 * @param {Object} req.cookies - Request cookies
 * @param {string} req.cookies.studentToken - JWT token from cookie
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Calls next() on success or sends error response
 * 
 * @throws {401} When no token is provided
 * @throws {400} When token is invalid
 * @throws {404} When student is not found
 * @throws {500} When internal server error occurs
 * 
 * @description
 * On successful authentication, this middleware adds the following to the request object:
 * - req.studentDetails: Complete student document from database

 */
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
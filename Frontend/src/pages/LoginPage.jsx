import { useParams, useNavigate} from "react-router-dom"
import { useState } from "react";
import LoginNavbar from "../layouts/LoginNavbar";
import axiosInstance from "../configs/axiosConfig.js";
import { useDispatch } from "react-redux";
import { setStudentPersonalInfo } from "../modules/student/reduxSlices/studentSlice.js";
function LoginPage() {
     // Initialize Redux dispatch which allow us to dispatch actions to the Redux store
     const dispatch = useDispatch();

     // useNavigate hook allows us to programmatically navigate to different routes
     const navigate = useNavigate();

     // Extract userType from the URL parameters
     const { userType } = useParams();

     //firstInput stores the teacher ID, admin ID or roll number
     //secondInput stores the password or phone number
     const [firstInput, setFirstInput] = useState("");
     const [secondInput, setSecondInput] = useState("");
     const [loading, setLoading] = useState(false);

     // Handle form submission and login logic
     //this function fetches the userType from the URL and make the API call accordingly
     const handleLogin = async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
               const response = await axiosInstance.post(`/${userType == "teacher" ? "teacher" : userType == "admin" ? "admin" : "student"}/login`, {
                    [userType == "teacher" ? "teacherId" : userType == "admin" ? "adminId" : "rollNo"]: firstInput,
                    [userType == "teacher" || userType == "admin" ? "password" : "phone"]: secondInput
               })
               if(userType == "student"){
                    dispatch(setStudentPersonalInfo(response.data.student)); // Dispatching the student info to the Redux store
                    console.log("Login successful:", response.data.student);
               }
               //todo: handle the response for teacher and admin login later
               navigate("/"); // Navigate to the home page after successful login
          } catch (error) {
               console.error("Login failed:", error.response);
               alert("Login failed." + error.response.data.message);
          } finally {
               setLoading(false);
               setFirstInput("");
               setSecondInput("");
          }
     }
     return (
          <>
               <LoginNavbar />
               <div className="h-[calc(100dvh-4.4rem)] flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{userType == "teacher" ? "Teacher Login" : userType == "admin" ? "Administrator Login" : "Student Login"}</h2>
                         <form className="space-y-6">
                              {/* first input */}
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{userType == "teacher" ? "Teacher ID" : userType == "admin" ? "Admin ID" : "Roll Number"}</label>
                              <input
                                   type="Number"
                                   id="email" //it points to email if userType is student, otherwise it points to ID
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder={userType == "teacher" ? "Enter teacher ID" : userType == "admin" ? "Enter admin ID" : "Enter roll number"}
                                   value={firstInput}
                                   onChange={(e) => setFirstInput(e.target.value)}
                                   onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                             e.preventDefault(e);
                                             document.getElementById("password").focus(); //focus on the password input when Enter is pressed
                                        }
                                   }}
                                   required
                              />

                              {/* second input  */}
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{userType == "teacher" || userType == "admin" ? "Password" : "Phone"}</label>
                              <input
                                   type={userType == "teacher" || userType == "admin" ? "password" : "number"}
                                   id="password" //it points to password if userType is teacher or admin, otherwise it points to phone
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder={userType == "teacher" || userType == "admin" ? "Enter Password" : "Enter Phone number"}
                                   value={secondInput}
                                   onChange={(e) => setSecondInput(e.target.value)}
                                   onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                             handleLogin(e);
                                        }
                                   }}
                                   required
                              />

                              {/* submit button */}
                              <button
                                   type="submit"
                                   className="w-full bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                                   onClick={handleLogin}
                                   disabled={loading}
                              >
                                   {/* displaying the loading spinner if button already clicked */}
                                   {loading ? (
                                        <div className="flex items-center">
                                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                             </svg>
                                             <span>Signing in...</span>
                                        </div>
                                   ) : (
                                        "Sign in"
                                   )}
                              </button>
                         </form>
                    </div>
               </div>
          </>
     )
}

export default LoginPage

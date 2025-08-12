import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axiosInstance from "./configs/axiosConfig"
import { useSelector } from "react-redux"
import { setStudentPersonalInfo } from "./modules/student/reduxSlices/studentSlice.js"
import Student from "./modules/student/Student.jsx"

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // fetch the data from the server to check if the user is logged in or not and store it in the redux store
  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/student/details").then((response) => {
      dispatch(setStudentPersonalInfo(response.data.student));

    }).catch((error)=>{
      console.error("Error fetching student details:", error);
      dispatch(setStudentPersonalInfo({})); // Clear student info in case of error

    }).finally(()=>{
      setLoading(false);  //set loading to false after fetching data or if error occurs
    })
  }, [dispatch]);

  // Get the student details from the Redux store
  // This will be used to check if the student is already logged in or not
  const studentDetails = useSelector((state) => state.student.studentInfo);

  //return the loading page if the data is still being fetched
  if(loading){
    return <> Loading</>
  }

  return (
    <>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={
          studentDetails.name ? <Navigate to="/student" replace /> :
          <Navigate to="/login/student" replace />
        } />
        
        <Route path="/login/:userType/*" element={
          studentDetails.name? <Navigate to="/student" replace /> : <LoginPage/>
        } />

        <Route path="/student/*" element={
          studentDetails.name? <Student/> : <Navigate to="/login/student"/>
        }/>


        {/* route to handle the invalid paths  */}
        <Route path="*" element={<h1>invalid path</h1>} />
      </Routes>
    </>
  )
}

export default App

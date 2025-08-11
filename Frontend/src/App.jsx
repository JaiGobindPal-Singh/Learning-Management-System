import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { Navigate } from "react-router-dom"
function App() {

  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Navigate to="/login/student" replace />} />
        <Route path="/login/:userType" element={<LoginPage/>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="*" element={<h1>invalid path</h1>} />
      </Routes>

    </>
  )
}

export default App

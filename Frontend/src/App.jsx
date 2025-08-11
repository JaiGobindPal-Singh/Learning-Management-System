import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/loginPage"
function App() {
  return (
    <div>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<LoginPage/>} />
        <Route path="/:userType" element={<LoginPage/>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="*" element={<h1>invalid path</h1>} />
      </Routes>

    </div>
  )
}

export default App

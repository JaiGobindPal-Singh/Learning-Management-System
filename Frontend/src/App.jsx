import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <div>
      <Routes>
            {/* Define your routes here */}
               <Route path="/" element={<h1 className="text-5xl text-blue-500">home page</h1>} />
               <Route path="/about" element={<h1>About Page</h1>} />
               <Route path="*" element={<h1>invalid path</h1>} />
      </Routes>
      
    </div>
  )
}

export default App

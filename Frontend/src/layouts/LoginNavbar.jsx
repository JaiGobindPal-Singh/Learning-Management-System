import { NavLink } from "react-router-dom"
export default function LoginNavbar() {
     return (
          <>
               <nav className="bg-gradient-to-r from-blue-700 to-indigo-900 shadow-lg">
                    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                         <div className="flex items-center">
                              <span className="max-md:hidden text-white font-bold text-2xl tracking-tight">Learning Management System</span>
                              <span className="md:hidden text-white font-bold text-2xl tracking-tight">LMS</span>
                         </div>
                         <div className="flex space-x-6 max-md:space-x-3">
                              <NavLink 
                                   to="/login/student" 
                                   className={({ isActive }) =>( 
                                        isActive 
                                        ? "text-white font-medium border-b-2 border-white py-2 transition-all duration-300 "
                                        : "text-gray-300 hover:text-white py-2 border-b-2 border-transparent hover:border-gray-300 transition-all duration-300")
                                   }
                              >
                                   Student
                              </NavLink>
                              <NavLink 
                                   to="/login/teacher" 
                                   className={({ isActive }) => 
                                        isActive 
                                        ? "text-white font-medium border-b-2 border-white py-2 transition-all duration-300"
                                        : "text-gray-300 hover:text-white py-2 border-b-2 border-transparent hover:border-gray-300 transition-all duration-300"
                                   }
                              >
                                   Teacher
                              </NavLink>
                              <NavLink 
                                   to="/login/admin" 
                                   className={({ isActive }) => 
                                        isActive 
                                        ? "text-white font-medium border-b-2 border-white py-2 transition-all duration-300"
                                        : "text-gray-300 hover:text-white py-2 border-b-2 border-transparent hover:border-gray-300 transition-all duration-300"
                                   }
                              >
                                   Admin
                              </NavLink>
                         </div>
                    </div>
               </nav>
          </>
     )
}

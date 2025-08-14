import { NavLink } from "react-router-dom"
export default function LoginNavbar() {
     return (
          <>
               <nav className="bg-gradient-to-r from-blue-700 to-indigo-900 shadow-lg">
                    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                         <div className="flex items-center">
                              <span className="max-md:hidden text-white font-bold text-2xl tracking-tight">Core Scholar</span>
                              <span className="md:hidden text-white font-bold text-2xl tracking-tight"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <circle cx="16" cy="16" r="15" fill="#2563eb" />
                                   <g transform="translate(10, 12)">
                                        <path d="M1 4 C1 3, 2 2, 4 2 C6 2, 6 3, 6 4 L6 8 C6 8, 5 7, 4 7 C2 7, 1 8, 1 8 Z"
                                             fill="#ffffff" />
                                        <path d="M6 4 C6 3, 7 2, 9 2 C11 2, 11 3, 11 4 L11 8 C11 8, 10 7, 9 7 C7 7, 6 8, 6 8 Z"
                                             fill="#ffffff" />
                                        <line x1="6" y1="4" x2="6" y2="8" stroke="#ffffff" stroke-width="1" />
                                   </g>
                                   <rect x="12" y="10" width="8" height="2" rx="1" fill="#fbbf24" />
                              </svg></span>
                         </div>
                         <div className="flex space-x-6 max-md:space-x-3">
                              <NavLink
                                   to="/login/student"
                                   className={({ isActive }) => (
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

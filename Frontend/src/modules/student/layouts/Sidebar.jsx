function Sidebar({activeItem, setActiveItem}) {

     return (
          <div className="flex h-screen max-sm:h-[91.5dvh]">
               <div className="w-64 bg-gray-800 text-white shadow-lg">
                    
                    {/* Sidebar header */}
                    <div className="p-5 border-b border-gray-700 ">
                         <h3 className="text-xl font-semibold">Student Portal</h3>
                    </div>

                    {/* list of the navigable items to be displayed in sidebar */}
                    <ul className="mt-4">
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'dashboard' ? 'bg-gray-700' : ''}`}>
                              <a href="/student/dashboard" className="flex items-center" onClick={() => setActiveItem('dashboard')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                   <span>Dashboard</span>
                              </a>
                         </li>
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'announcements' ? 'bg-gray-700' : ''}`}>
                              <a href="/student/announcements" className="flex items-center" onClick={() => setActiveItem('announcements')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                                   <span>Announcements</span>
                              </a>
                         </li>
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'classGroup' ? 'bg-gray-700' : ''}`}>
                              <a href="/student/class-group" className="flex items-center" onClick={() => setActiveItem('classGroup')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                   <span>Class Group</span>
                              </a>
                         </li>
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'feePayment' ? 'bg-gray-700' : ''}`}>
                              <a href="/student/fee-payment" className="flex items-center" onClick={() => setActiveItem('feePayment')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                   <span>Fee Payment</span>
                              </a>
                         </li>
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'assignments' ? 'bg-gray-700' : ''}`}>
                              <a href="/student/assignments" className="flex items-center" onClick={() => setActiveItem('assignments')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                                   <span>Assignments</span>
                              </a>
                         </li>
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'studyMaterial' ? 'bg-gray-700' : ''}`}>
                              <a href="/student/study-material" className="flex items-center" onClick={() => setActiveItem('studyMaterial')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                   <span>Study Material</span>
                              </a>
                         </li>
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'aiTeacher' ? 'bg-gray-700' : ''}`}>
                              <a href="/student/ai-teacher" className="flex items-center" onClick={() => setActiveItem('aiTeacher')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                   <span>AI Teacher</span>
                              </a>
                         </li>
                         <li className={`px-5 py-3 hover:bg-gray-700 transition-colors ${activeItem === 'logout' ? 'bg-gray-700' : ''}`}>
                              <a href="/logout" className="flex items-center" onClick={() => setActiveItem('logout')}>
                                   <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                   <span>Logout</span>
                              </a>
                         </li>
                    </ul>
               </div>
          </div>
     )
}

export default Sidebar

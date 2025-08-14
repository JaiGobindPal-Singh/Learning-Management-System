//navbar that appears on mobile devices for the navigation and hamburger menu
/**
 * 
 * @param {Object} props
 * @param {string} props.pageTitle - The title of the current page to be displayed in the navbar.
 * @param {boolean} props.showSidebar - A boolean indicating whether the sidebar is currently visible.
 * @param {Function} props.setShowSidebar - A function to toggle the visibility of the sidebar.
 * @description This component renders a mobile-friendly navigation bar with a title and a toggle button for the sidebar.
 * @returns {JSX.Element} The rendered MobileNavbar component.
 */
export default function MobileNavbar({ pageTitle, showSidebar, setShowSidebar }) {
     return (
          <div>
               <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md">
                    <button className="focus:outline-none sm:hidden"
                         onClick={() => setShowSidebar(!showSidebar)}>
                         <div className="transition-all duration-500 ease-in-out">
                              {!showSidebar ?
                                   (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                   </svg>) :
                                   (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                   </svg>)
                              }
                         </div>
                    </button>

                    <h1 className="text-xl font-bold">{pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}</h1>

               </nav>
          </div>
     )
}

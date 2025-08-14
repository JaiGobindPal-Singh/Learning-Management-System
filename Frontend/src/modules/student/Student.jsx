/**
 * @intro the main entry point for the student module
 * @description It includes the main layout, sidebar, and other components
 * @returns {JSX.Element} The rendered Student component.
 */
import { useSelector } from "react-redux";
import { useState } from "react";
import MobileNavbar from "./layouts/MobileNavbar";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./components/Dashboard"
import AItutor from "./components/AItutor";
function Student() {

     //* states used in the student module
     const [activeItem, setActiveItem] = useState("dashboard"); // Set the active item based on the option or default to "dashboard"
     const [showSidebar, setShowSidebar] = useState(false); // This state is used to control the visibility of the sidebar on mobile devices

     //* Get the student details from the Redux store
     const studentDetails = useSelector((state) => state.student.studentInfo);
     return (
          <>
               <div className="sm:hidden">
                    <MobileNavbar pageTitle={activeItem} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
               </div>
               <div className="flex w-full ">
                    <div className={`sm:hidden absolute transition-all duration-300 ease-in-out z-50 -left-[100rem] ${showSidebar && "left-0"}`}>
                    {showSidebar && <Sidebar activeItem={activeItem} setShowSidebar={setShowSidebar} setActiveItem={setActiveItem} />}
                    </div>
                    <div className="max-sm:hidden">
                         <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
                    </div>
                    <div className="w-full ">
                         {/* This is the main content area where the active component will be rendered */}
                         <div className="max-sm:hidden"> {/* This is the navbar which will appear on large screens*/}
                         <MobileNavbar pageTitle={activeItem} />
                         </div>
                         {
                              //todo:add the navigable items here
                              activeItem === "dashboard" ?
                                   <Dashboard studentDetails={studentDetails} />
                                   : activeItem === "ai Tutor" ?
                                   <AItutor/> : "under development"
                         }
                    </div>
               </div>
          </>
     )
}

export default Student

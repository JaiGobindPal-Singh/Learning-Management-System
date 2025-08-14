//Dashboard panel for student module 
/**
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.studentDetails - The personal details of the student to be displayed.
 * @returns {JSX.Element} The rendered Dashboard component.
 * @description This component displays the student's personal information and profile details.
 * It includes the student's name, roll number, email, phone, class, and profile picture
 */

export default function Dashboard({studentDetails}) {
     return (
          <div>
               <div className="flex justify-center items-center h-[92dvh] w-full bg-gradient-to-br from-blue-50 to-violet-100 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border border-violet-200">
                         <div className="flex flex-col items-center mb-6">
                              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-violet-500 shadow-md">
                                   <img
                                        src={studentDetails.profilePicture ? studentDetails.profilePicture : null}
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                   />
                              </div>
                              <h2 className="text-2xl font-bold text-indigo-800">{studentDetails.name}</h2>
                              <p className="text-violet-600">{studentDetails.class + " - " + studentDetails.classSemester}</p>
                         </div>

                         <div className="border-t border-blue-200 pt-4">
                              <h3 className="text-lg font-semibold mb-3 text-blue-700">Student Details</h3>
                              <ul className="space-y-2">
                                   <li className="flex justify-between">
                                        <span className="text-blue-600">Roll No:</span>
                                        <span className="font-medium text-violet-800">{studentDetails.rollNo}</span>
                                   </li>
                                   <li className="flex justify-between">
                                        <span className="text-blue-600">Phone:</span>
                                        <span className="font-medium text-violet-800">{studentDetails.phone}</span>
                                   </li>
                                   <li className="flex justify-between items-center">
                                        <span className="text-blue-600">Email:</span>
                                        <span className={`font-medium text-md text-violet-800 max-[330px]:text-sm max-[284px]:text-xs `}>{studentDetails.email}</span>
                                   </li>
                              </ul>
                         </div>
                    </div>
               </div>

          </div>
     )
}

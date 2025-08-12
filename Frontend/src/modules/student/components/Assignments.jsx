
/**
 * @component Assignments
 * @description Displays a list of assignments for the student.
 */
import { useState } from 'react';

//todo: fetch the assignments from the API server
//*sample data for testing
const assignments = [
     {
          id: 1,
          title: 'Math Assignment 1',
          description: 'Solve all questions from chapter 2.',
          dueDate: '2024-06-15',
          subject: 'Mathematics'
     },
     {
          id: 2,
          title: 'Science Project',
          description: 'Prepare a model of the solar system.',
          dueDate: '2024-06-20',
          subject: 'Science'
     }
];

//*assignment card component
function AssignmentCard({ assignment, onClick }) {
     return (
          <div
               className='assignment-card border-2 border-blue-700 rounded-2xl'
               style={{
                    padding: 16,
                    marginBottom: 12,
                    cursor: 'pointer',
                    background: '#f9f9f9',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
               }}
               onClick={onClick}
          >
               <h3 className='assignment-title text-xl font-semibold'>{assignment.title}</h3>
          </div>
     );
}

//*popup modal for the assignment details
function AssignmentDetailsModal({ assignment, onClose }) {
     if (!assignment) return null;
     return (
          <div
               style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
               }}
               onClick={onClose}
          >
               <div
                    style={{
                         background: '#fff',
                         padding: 24,
                         borderRadius: 8,
                         minWidth: 300,
                         position: 'relative'
                    }}
                    onClick={e => e.stopPropagation()}
               >
                    <h1 className='text-2xl font-bold mb-5'>{assignment.title}</h1>
                    {/* <p><strong>Subject:</strong> {assignment.subject}</p> */}
                    <p><strong>Description:</strong> {assignment.description}</p>
                    <p><strong>Deadline:</strong> {assignment.dueDate}</p>
                    <button  className='border-2 px-2 py-[0.5] rounded border-blue-700
                    ' onClick={onClose} style={{ marginTop: 16 }}>Close</button>
               </div>
          </div>
     );
}

//*displays the list of the assignments
function AssignmentsList() {
     const [selected, setSelected] = useState(null);

     return (
          <>
               <div className='assignments-list p-20'>

                    {assignments.map(a => (
                         <AssignmentCard
                              key={a.id}
                              assignment={a}
                              onClick={() => setSelected(a)}
                         />
                    ))}
                    <AssignmentDetailsModal
                         assignment={selected}
                         onClose={() => setSelected(null)}
                    />
               </div>
          </>
     );
}

//* main component to render
function Assignments() {
     return (
          <div>
               <AssignmentsList />
          </div>
     )
}

export default Assignments

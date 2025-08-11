import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     studentInfo:{
          name: '',
          rollNo: '',
          email: '',
          profilePicture: '',
          phone: '',
          class: '',
          classSemester: '',
     },
     resources:{
          groupMessages:[],
          studyMaterials:[],
          assignments:[],
          announcements:[],
     }
}

export const studentSlice = createSlice({
     name: 'student',
     initialState,
     reducers: {
          // Define your reducers here that mutate the state
          setStudentPersonalInfo: (state, action) =>{
               state.studentInfo= action.payload;
          },
          setGroupMessages: (state, action) => {
               state.resources.groupMessages = action.payload;
          },
          setStudyMaterials: (state, action) => {
               state.resources.studyMaterials = action.payload;
          },
          setAssignments: (state, action) => {
               state.resources.assignments = action.payload;
          },
          setAnnouncements: (state, action) => {
               state.resources.announcements = action.payload;
          },
          clearStudentData: (state) => {
               state.studentInfo = initialState.studentInfo;
               state.resources = initialState.resources;
          }
     },
})

// Action creators are generated for each case reducer function
export const { setStudentPersonalInfo, setGroupMessages, setStudyMaterials, setAssignments, setAnnouncements, clearStudentData } = studentSlice.actions

export default studentSlice.reducer
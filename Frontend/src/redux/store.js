import { configureStore } from '@reduxjs/toolkit'
import studentReducer from "../modules/student/reduxSlices/studentSlice.js"
export const store = configureStore({
     reducer: {
          student: studentReducer
     },
})
import mongoose from "mongoose";
const studentClassesSchema = new mongoose.Schema({
     rollNo: {
          type: Number,
          unique: true,
          ref: "students",
     },
     classID:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "classes",
          required: true,
     },
     semester: {
          type: Number,
          required: true,
     },
})
export default mongoose.model("studentClasses", studentClassesSchema);
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     rollNo:{
          type: Number,
          required: true,
          unique: true,
          primary: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     profilePicture:{
          type: String,
          default: "https://www.w3schools.com/howto/img_avatar.png",
     },
     phone:{
          type: Number,
          required: true,
          unique: true,
     },
     class: {
          type: String,
          required: true,
     },
     classSemester: {
          type: Number,
          required: true,
     },
});
export default mongoose.model("students", studentSchema);

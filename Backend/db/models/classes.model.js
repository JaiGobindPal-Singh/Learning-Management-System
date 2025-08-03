import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
     class: {
          type: String,
          required: true,
     },
     // classID is the unique identifier for the class
     classID: {
          type: mongoose.Schema.Types.ObjectId,
          default: new mongoose.Types.ObjectId(),
          unique: true,
          required: true
     },
     semesters:[{
          semester:{
               type: Number,
               required: true,
          },
          classGroup:{
               messages:[{
                    important:Boolean,
                    message: String,
                    image: String,
                    document: String,
                    time: { type: Date, default: Date.now },
               }]
          },
          studyMaterials: [{
               title:{ type: String, required: true },
               description: { type: String},
               fileUrl: { type: String},
               time: { type: Date, default: Date.now},
               uploadedBy: { type: String, required: true}
          }],
          assignments: [{
               title: { type: String, required: true },
               description: { type: String },
               posted: { type: Date, default: Date.now },
               deadline: { type: Date, required: true },
               time: { type: Date, default: Date.now }
               
          }],
     }]
});
export default mongoose.model("classes", classSchema);
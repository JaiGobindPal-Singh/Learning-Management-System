import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
     className: {
          type: String,
          required: true,
     },
     classID:{
          type: Number,
          required: true,
          unique: true,
     },
     semesters:{
          semester:{
               type: Number,
               required: true,
          },
          classGroup:{
               messages:[{
                    type: String,
                    important:Boolean,
                    message: String,
                    image: { type: String },
                    document: { type: String },
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
     }
});
export default mongoose.model("classes", classSchema);
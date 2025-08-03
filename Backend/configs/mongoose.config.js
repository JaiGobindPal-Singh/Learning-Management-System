import mongoose from "mongoose";

//function to connect to MongoDB atlas
export const connectDB = async()=>{
     mongoose.connect(process.env.MONGODB_URI);
}
export default mongoose;
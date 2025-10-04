import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://blog_app:blogAPP123@cluster0.yjqgqjz.mongodb.net/blog-app');
    //await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
}
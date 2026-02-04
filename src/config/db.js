import mongoose from "mongoose";


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfull");
  } catch (error) {
    console.log("error in connecting the database", error)
    //This is for is database is not work then app does not load
    process.exit(1);
  }
}

export default connectDb;
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGO environment variable");
}

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return mongoose;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("Connected to MongoDB");
    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectToDatabase;
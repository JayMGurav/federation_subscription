import mongoose from "mongoose";

export default async function connectMongoDB({url,name}){
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on('error', () => {
      throw new Error(`connecton error: DB ${name}`);
    });
    db.once('open', function() {
      console.log(`DB for ${name} connected at 🚀`)
    });
  } catch (error) {
    console.error('😦 Error!!', error.message);
  }
}
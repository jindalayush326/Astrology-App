const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://jindalpradum:12345@astrologer.uvkuetg.mongodb.net/astrologer?retryWrites=true&w=majority&appName=astrologer";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("MongoDB connected successfully");

    const fetched_data = await mongoose.connection.db.collection("details_items").find({}).toArray();
    const detailsCategory_data = await mongoose.connection.db.collection("detailsCategory").find({}).toArray();

    global.details_items = fetched_data;
    global.detailsCategory = detailsCategory_data;

    // console.log(global.details_items);
    // console.log(global.detailsCategory);
  }
  catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  }
};

module.exports = mongoDB;
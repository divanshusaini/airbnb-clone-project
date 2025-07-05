const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  
  // Add null check for data
  if (!initData.data) {
    console.error("initData.data is undefined. Check your data file structure.");
    return;
  }
  
  // Complete the mapping function with geometry field
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6861166a658a752d3ba3bfe9",
    geometry: {
      type: "Point",
      coordinates: [obj.longitude || 77.2090, obj.latitude || 28.6139] // Default to Delhi coordinates if not provided
    }
  }));
  
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
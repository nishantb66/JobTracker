const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect(
  "mongodb+srv://nishantbaruah3:jYNYc8n622znUzuU@jobtracker.oxmgu.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin@1234", 10); // Hash the password
    const admin = new Admin({ username: "admin", password: hashedPassword });
    await admin.save();
    console.log("Admin account created");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

createAdmin();

// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema({
//     jobTitle: { type: String, required: true },
//     companyName: { type: String, required: true },
//     status: { type: String, enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'], required: true },
//     dateApplied: { type: Date, default: Date.now },
//     notes: { type: String },
// });

// module.exports = mongoose.model('Application', applicationSchema);

const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Offered", "Rejected"],
    required: true,
  },
  dateApplied: { type: Date, required: true },
  notes: { type: String },
});

module.exports = mongoose.model("JobApplication", JobApplicationSchema);


const Application = require("../models/Application");

// Get All Applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Application
exports.createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({
      success: true,
      message: "Application saved successfully!", // Added success message
      application,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to save the application.",
      error: err.message,
    });
  }
};

// Update Application
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const application = await Application.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.status(200).json({
      success: true,
      message: "Application updated successfully!",
      application, // Make sure to return the updated application
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating application",
      error: err.message,
    });
  }
};




// Delete Application
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }
    res.status(200).json({
      success: true,
      message: "Application deleted successfully!", // Added success message
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting application",
      error: err.message,
    });
  }
};

const express = require("express");
const JobApplication = require("../models/JobApplication");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// Get All Applications for Logged-In User
router.get("/", authenticate, async (req, res) => {
  try {
    const applications = await JobApplication.find({ userId: req.user.id });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Application
router.post("/", authenticate, async (req, res) => {
  try {
    const { jobTitle, companyName, status, dateApplied, notes } = req.body;
    const application = new JobApplication({
      userId: req.user.id,
      jobTitle,
      companyName,
      status,
      dateApplied,
      notes,
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Application
router.put("/:id", authenticate, async (req, res) => {
  try {
    const application = await JobApplication.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Application
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const application = await JobApplication.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

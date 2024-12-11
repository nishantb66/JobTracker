const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes); // Add this line

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sleepRoutes = require('./src/routes/sleepRoutes');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sleeptracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api', sleepRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

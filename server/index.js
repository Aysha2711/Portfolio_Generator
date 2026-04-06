require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
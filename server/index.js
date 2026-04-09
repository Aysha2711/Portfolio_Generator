require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-generator-fawn.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow tools like Postman

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  credentials: true
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Connect to Database
connectDB();

const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
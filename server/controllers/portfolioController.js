const UserPortfolio = require('../models/UserPortfolio'); // import mongodb model to raed/write from db

// desc -    Create a new portfolio
// route -  POST /api/portfolio
const createPortfolio = async (req, res) => {
  try {
    const { username, fullName } = req.body; // get data from frontend request 

    if (!username || !fullName) { // validate data
      return res.status(400).json({ message: 'Username and Full Name are required.' });
    }

    // Check if username unique (already exists)
    const existingPortfolio = await UserPortfolio.findOne({ username });
    if (existingPortfolio) {
      return res.status(400).json({ message: 'Username already exists. Please choose another one.' });
    }

    const newPortfolio = await UserPortfolio.create(req.body); // save data to db
    res.status(201).json(newPortfolio); // send success response to frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// desc -    Fetch a portfolio by username
// route -  GET /api/portfolio/:username
const getPortfolioByUsername = async (req, res) => {
  try {
    const portfolio = await UserPortfolio.findOne({ username: req.params.username }); // find portfolio by username in the URL

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }

    res.status(200).json(portfolio); // send success response (portfolio data) to frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// desc -    Update an existing portfolio
// route -   PUT /api/portfolio/:username
const updatePortfolio = async (req, res) => {
  try {
    const { username } = req.params; // get current username from URL
    
    // Prevent updating to an already existing username that belongs to someone else
    if (req.body.username && req.body.username !== username) { // check if new username exists
      const existingUsername = await UserPortfolio.findOne({ username: req.body.username });
      if (existingUsername) {
        return res.status(400).json({ message: 'New username already taken. Please choose another one.' });
      }
    }

    const updatedPortfolio = await UserPortfolio.findOneAndUpdate(
      { username },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// desc -    Delete a portfolio
// route -   DELETE /api/portfolio/:username
const deletePortfolio = async (req, res) => {
  try {
    const deletedPortfolio = await UserPortfolio.findOneAndDelete({ username: req.params.username }); // find portfolio by username in the URL

    if (!deletedPortfolio) { // check if portfolio exists
      return res.status(404).json({ message: 'Portfolio not found.' });
    }

    res.status(200).json({ message: 'Portfolio deleted successfully.' }); // send success response to frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio
};

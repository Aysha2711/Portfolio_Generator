const UserPortfolio = require('../models/UserPortfolio');

const createPortfolio = async (req, res) => {
  try {
    const { username, fullName } = req.body; 

    if (!username || !fullName) { 
      return res.status(400).json({ message: 'Username and Full Name are required.' });
    }

    const existingPortfolio = await UserPortfolio.findOne({ username });
    if (existingPortfolio) {
      return res.status(400).json({ message: 'Username already exists. Please choose another one.' });
    }

    const newPortfolio = await UserPortfolio.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPortfolios = async (req, res) => {
  try {
    const portfolios = await UserPortfolio.find({ user: req.user.id });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPortfolioByUsername = async (req, res) => {
  try {
    const portfolio = await UserPortfolio.findOne({ username: req.params.username });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }

    res.status(200).json(portfolio); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const { username } = req.params; 
    
    const portfolioToUpdate = await UserPortfolio.findOne({ username });
    if (!portfolioToUpdate) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }

    if (portfolioToUpdate.user.toString() !== req.user.id) {
       return res.status(401).json({ message: 'User not authorized to update this portfolio' });
    }

    if (req.body.username && req.body.username !== username) { 
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

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const portfolioToDelete = await UserPortfolio.findOne({ username: req.params.username }); 

    if (!portfolioToDelete) { 
      return res.status(404).json({ message: 'Portfolio not found.' });
    }
    
    if (portfolioToDelete.user.toString() !== req.user.id) {
       return res.status(401).json({ message: 'User not authorized to delete this portfolio' });
    }

    await portfolioToDelete.deleteOne();

    res.status(200).json({ message: 'Portfolio deleted successfully.' }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPortfolio,
  getUserPortfolios,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio
};

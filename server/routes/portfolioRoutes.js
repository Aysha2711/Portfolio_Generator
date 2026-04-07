const express = require('express');
const {
  createPortfolio,
  getUserPortfolios,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolioController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPortfolio);
router.get('/user', protect, getUserPortfolios);
router.get('/:username', getPortfolioByUsername); // Public
router.put('/:username', protect, updatePortfolio);
router.delete('/:username', protect, deletePortfolio);

module.exports = router;


// Part	Meaning
// router	Express router
// METHOD	HTTP method (GET, POST, PUT, DELETE)
// ROUTE	URL path
// FUNCTION	Controller function
const express = require('express');
const {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolioController');

const router = express.Router();

router.post('/', createPortfolio);
router.get('/:username', getPortfolioByUsername);
router.put('/:username', updatePortfolio);
router.delete('/:username', deletePortfolio);

module.exports = router;


// Part	Meaning
// router	Express router
// METHOD	HTTP method (GET, POST, PUT, DELETE)
// ROUTE	URL path
// FUNCTION	Controller function
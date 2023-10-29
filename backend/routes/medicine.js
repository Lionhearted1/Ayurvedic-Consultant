const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicine');


router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query.' });
    }
  
    try {
      const matchingMedicines = await Medicine.find({
        medicine: { $regex: query, $options: 'i' }, 
      });
  
      if (matchingMedicines.length === 0) {
        res.json({ message: 'No matching medicines found.' });
      } else {
        res.json(matchingMedicines);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/search-indications', async (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query for indications.' });
    }
  
    try {
      const matchingMedicines = await Medicine.find({
        $or: [
          { indications: { $elemMatch: { $regex: query, $options: 'i' } } },
        ]
      });
  
      if (matchingMedicines.length === 0) {
        res.json({ message: 'No matching indications found.' });
      } else {
        res.json(matchingMedicines);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
router.get('/autocomplete', async (req, res) => {
    const { query } = req.query;
  
    try {
      const matchingMedicines = await Medicine.find({
        'indications': { $in: [new RegExp(query, 'i')] }
      });
  
      if (matchingMedicines.length === 0) {
        res.json({ message: 'No matching indications found.' });
      } else {
        res.json(matchingMedicines);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
router.get('/precautions', async (req, res) => {
    const { indications } = req.query;
  
    if (!indications) {
      return res.status(400).json({ message: 'Please provide a valid list of indications.' });
    }
  
    try {
      const indicationsArray = indications.split(',');
  
      if (indicationsArray.length === 0) {
        return res.status(400).json({ message: 'Please provide a valid list of indications.' });
      }
  
      // Find medicines that have ALL of the specified indications
      const matchingMedicines = await Medicine.find({
        'indications': { $all: indicationsArray }
      });
  
      if (matchingMedicines.length === 0) {
        res.json({ message: 'No precautions found for the specified indications.', indicationsArray });
      } else {
        // Extract precautions from the matching medicines
        const precautions = matchingMedicines.reduce((precautions, medicine) => {
          precautions.push(...medicine.precaution);
          return precautions;
        }, []);
  
        // Remove duplicates from the precautions array and exclude "NS"
        const uniquePrecautions = [...new Set(precautions.filter(p => p !== 'NS'))];
  
        res.json(uniquePrecautions);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
router.get('/filter', async (req, res) => {
    const { indications, precautions } = req.query;
  
    if (!indications) {
      return res.status(400).json({ message: 'Please provide a valid array of indications.' });
    }
  
    try {
      const indicationsArray = indications.split(',');
      let query = {
        'indications': { $in: indicationsArray },
      };
  
      if (precautions) {
        const precautionsArray = precautions.split(',');
        if (precautionsArray.length > 0) {
          query['precaution'] = { $nin: precautionsArray };
        }
      }
  
      const matchingMedicines = await Medicine.find(query);
  
      if (matchingMedicines.length === 0) {
        res.json({ message: 'No medicines found for the specified indications and precautions.' });
      } else {
        res.json(matchingMedicines);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
module.exports = router;
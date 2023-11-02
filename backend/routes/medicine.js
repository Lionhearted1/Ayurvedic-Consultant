const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicine');

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(404).json(medicines);
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
        res.status(404).json({ message: 'No matching medicines found.' });
      } else {
        res.status(200).json(matchingMedicines);
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
        res.status(404)({ message: 'No matching indications found.' });
      } else {
        res.status(200)(matchingMedicines);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
router.get('/autocompleteindications', async (req, res) => {
  const { query } = req.query;

  try {
    const matchingMedicines = await Medicine.find({
      'indications': { $in: [new RegExp(query, 'i')] }
    });

    if (matchingMedicines.length === 0) {
      return res.status(404).json({ message: 'No matching indications found.' }); // 404 for "Not Found"
    } else {
      // Extract the 'indications' field from the matching medicines and create an array
      const indicationsArray = matchingMedicines.reduce((indications, medicine) => {
        indications.push(...medicine.indications);
        return indications;
      }, []);

      // Remove duplicates from the indications array and return it
      const uniqueIndications = [...new Set(indicationsArray)];

      return res.status(200).json(uniqueIndications); // 200 for "OK"
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); // 500 for "Internal Server Error"
  }
});

router.get('/precautions', async (req, res) => {
  const { indications } = req.query;

  if (!indications) {
    return res.status(400).json({ message: 'Please provide a valid list of indications.' });
  }

  // Extract the indications from the query parameter
  const indicationList = indications.split(',').map(indication => {
    // Filter out non-alphabetic characters from each indication
    const alphabeticIndication = indication.replace(/[^a-zA-Z]/g, '');
    return alphabeticIndication.toLowerCase();
  });

  // Remove empty indications
  const validIndications = indicationList.filter(indication => indication.length > 0);

  if (validIndications.length === 0) {
    return res.status(400).json({ message: 'Please provide a valid list of indications.' });
  }

  try {
    // Find medicines that have ANY of the specified indications (case-insensitive)
    const matchingMedicines = await Medicine.find({
      'indications': { $in: validIndications.map(i => new RegExp(i, 'i')) }
    });

    // Extract precautions from the matching medicines
    const precautions = matchingMedicines.reduce((precautions, medicine) => {
      precautions.push(...medicine.precaution);
      return precautions;
    }, []);

    // Remove duplicates from the precautions array and exclude "NS" (case-insensitive)
    const uniquePrecautions = [...new Set(precautions.filter(p => p.toLowerCase() !== 'ns'))];

    if (uniquePrecautions.length === 0) {
      return res.status(404).json({ message: 'No precautions found for the specified indications.' });
    }

    return res.json(uniquePrecautions);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/medicines', async (req, res) => {
  const { med } = req.query;

  if (!med) {
    return res.status(400).json({ message: 'Please provide a valid search query.' });
  }

  // Convert user input to lowercase for case-insensitive search
  const medicines = med.split(',').map(medicine => medicine.trim().toLowerCase());

  try {
    // Use $in operator to find medicines that match any of the specified medicines in the array
    const matchingMedicines = await Medicine.find({ 'medicineName': { $in: medicines } });

    if (matchingMedicines.length === 0) {
      return res.status(404).json({ message: 'No medicines found for the specified search query.' });
    }

    return res.json(matchingMedicines);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/autocompletemedicines', async (req, res) => {
  const { query } = req.query;

  try {
    // Use text search to find medicines based on the user's query (case-insensitive)
    const matchingMedicines = await Medicine.find({ $text: { $search: query } });

    if (matchingMedicines.length === 0) {
      return res.status(404).json({ message: 'No matching medicines found.' }); // 404 for "Not Found"
    } else {
      // Extract the 'medicineName' field from the matching medicines and create an array
      const medicinesArray = matchingMedicines.map(medicine => medicine.medicineName);

      // Remove duplicates from the medicines array and return it
      const uniqueMedicines = [...new Set(medicinesArray)];

      return res.status(200).json(uniqueMedicines); // 200 for "OK"
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); // 500 for "Internal Server Error"
  }
});


router.get('/filter', async (req, res) => {
  const { indications, precautions } = req.query;

  if (!indications) {
    return res.status(400).json({ message: 'Please provide a list of indications.' });
  }

  // Helper function to sanitize and remove trailing commas
  const sanitizeQuery = (queryParam) => {
    // Filter out non-alphabetic characters, special characters, and trailing commas
    return queryParam.split(',').map(param => param.replace(/[^a-zA-Z\s/,/-]/g, '').replace(/,+$/, '').trim());
  };

  try {
    // Sanitize and remove trailing commas from indications
    const sanitizedIndications = sanitizeQuery(indications);
    const indicationsArray = sanitizedIndications.map(indication => new RegExp(indication, 'i'));

    // Construct the query with sanitized indications
    let query = {
      'indications': { $in: indicationsArray },
    };

    if (precautions) {
      // Sanitize and remove trailing commas from precautions
      const sanitizedPrecautions = sanitizeQuery(precautions);
      const precautionsArray = sanitizedPrecautions.map(precaution => new RegExp(precaution, 'i'));
      if (precautionsArray.length > 0) {
        query['precaution'] = { $nin: precautionsArray };
      }
    }

    const matchingMedicines = await Medicine.find(query);

    if (matchingMedicines.length === 0) {
      return res.status(404).json({ message: 'No medicines found for the specified indications and precautions.' });
    } else {
      return res.status(200).json(matchingMedicines);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});




  
module.exports = router;

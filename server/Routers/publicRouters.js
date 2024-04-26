const express = require('express');
const PublicController = require('../Controllers/publicController');
const router = express.Router();
const { authentication } = require('../middleware/authentication');

// Get Artworks All and By Id
router.get('/artworks', PublicController.getAllArtwork);  
router.get('/artworks/:id', PublicController.getOneArtwork);  
    
module.exports = router;
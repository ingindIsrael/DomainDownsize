const mongoose = require('mongoose')
const ShortUrl = require('../models/shortUrl')

mongoose.connect(process.env.MONGODB_URI)

// module.exports = async (req, res) => {
//   await ShortUrl.create({ full: req.body.fullUrl })
//   res.status(200).json({ message: 'URL created' })
// }

module.exports = async (req, res) => {
    // Check if fullUrl is provided in the request body
    if (!req.body || !req.body.fullUrl) {
      return res.status(400).json({ message: 'No URL provided' });
    }
  
    try {
      // Attempt to create a ShortUrl with the provided full URL
      await ShortUrl.create({ full: req.body.fullUrl });
      return res.status(200).json({ message: 'URL created' });
    } catch (error) {
      console.error('Error creating short URL:', error);
      return res.status(500).json({ message: 'Error creating URL' });
    }
  };
  
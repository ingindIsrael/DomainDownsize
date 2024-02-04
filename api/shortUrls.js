const mongoose = require('mongoose')
const ShortUrl = require('../models/shortUrl')

mongoose.connect(process.env.MONGODB_URI)

module.exports = async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.status(200).json({ message: 'URL created' })
}
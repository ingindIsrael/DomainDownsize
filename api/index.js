const mongoose = require('mongoose')
const ShortUrl = require('../models/shortUrl')

mongoose.connect(process.env.MONGODB_URI)

module.exports = async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.status(200).json({ shortUrls: shortUrls })
}
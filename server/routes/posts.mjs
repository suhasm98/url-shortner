import express from 'express'
import shortid from 'shortid'
import db from '../db/conn.mjs'

const router = express.Router()

router.get('/:shortenedUrl', async (req, res) => {
  const { shortenedUrl } = req.params

  let collection = await db.collection('urls')

  let result = await collection.findOne({ shortenedUrl })

  if (!result) res.send('Not found').status(404)

  res.redirect(result.originalUrl)
})

// Get a list of 50 urls
router.get('/', async (req, res) => {
  let collection = await db.collection('urls')

  let results = await collection.find({}).limit(50).toArray()

  res.send(results).status(200)
})

// // Add a new document to the collection
// router.post('/', async (req, res) => {
//   let newDocument = req.body
//   let collection = await db.collection('urls')
//   newDocument.date = new Date()
//   let result = await collection.insertOne(newDocument)
//   res.send(result).status(204)
// })

router.post('/shorten', async (req, res) => {
  let collection = await db.collection('urls')
  let newDocument = req.body
  newDocument.date = new Date()
  newDocument.shortenedUrl = shortid.generate()
  let result = await collection.insertOne(newDocument)
  result.shortenedUrl = newDocument.shortenedUrl
  res.send(result).status(204)
})

export default router

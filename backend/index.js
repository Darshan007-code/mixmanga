import express from 'express'
import cors from 'cors'
import path from 'path'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import manga from './routes/manga.js'
import user from './routes/user.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || 'localhost'
const MONGO_DB_URL = process.env.MONGO_DB_URL

const client = new MongoClient(MONGO_DB_URL, {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000
})

async function main() {
  try {
    if (!MONGO_DB_URL) {
      throw new Error('MONGO_DB_URL is not defined in environment variables')
    }
    console.log('Connecting to DB...')
    await client.connect()
    console.log('DB Connected Successfully')
    const db = client.db()
    app.locals.db = db
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (e) {
    console.error('DATABASE CONNECTION ERROR:', e.message)
    console.error('FULL ERROR:', e)
    process.exit(1)
  }
}

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Api [mixmanga]',
  })
})

app.use('/api/manga', manga)
app.use('/api/user', user)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
)

main()

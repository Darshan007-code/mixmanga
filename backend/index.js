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

const client = new MongoClient(MONGO_DB_URL)

async function main() {
  // Start listening immediately so Render knows the app is alive
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is live on port ${PORT}`)
  })

  try {
    if (!MONGO_DB_URL) {
      throw new Error('MONGO_DB_URL is missing')
    }
    console.log('Attempting to connect to MongoDB Atlas...')
    
    await client.connect()
    
    console.log('✅ DB Connected Successfully')
    const db = client.db()
    app.locals.db = db
  } catch (e) {
    console.error('❌ DATABASE ERROR:', e.message)
    console.error('Check your IP Whitelist (0.0.0.0/0) and Password.')
    // Don't exit immediately, let the logs flush
    setTimeout(() => process.exit(1), 1000)
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

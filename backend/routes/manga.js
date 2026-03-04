import express from 'express'
import MangaController from '../controllers/manga.js'

const app = express.Router()
const mangaCtrl = MangaController()

app.route('/:id/:episode/:romaji').get((req, res) => {
  const { id, episode, romaji } = req.params
  mangaCtrl.getEpisode(
    req,
    {
      anilist_id: id,
      episode_no: episode,
      romaji: romaji,
    },
    ({ result, status }) => {
      res.status(status).json(result)
    }
  )
})

const manga = app
export default manga

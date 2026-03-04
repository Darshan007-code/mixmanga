export default function MangaController() {
  return {
    getEpisode: async function (req, { anilist_id, episode_no, romaji }, callback) {
      const db = req.app.locals.db;
      let defaultRes = {
        uuid: null,
        id: anilist_id,
        episode: episode_no,
        linkURL: {
          link: null,
          status: 200,
        },
        meta_data: {
          shift: 0,
        },
      }
      try {
        anilist_id = parseInt(anilist_id)
        episode_no = parseInt(episode_no)
        const result = await db.collection('maepisodes').aggregate([
          {
            $match: { anilist_id, episode_no },
          },
          {
            $lookup: {
              from: 'mamangas',
              localField: 'anilist_id',
              foreignField: 'anilist_id',
              as: 'title',
            },
          },
        ]).toArray()
        if (result.length === 1) {
          defaultRes.uuid = result[0]?.title?.romaji || null
          defaultRes.linkURL.link = result[0]?.links[0] || null
          return callback({
            result: defaultRes,
            status: 200,
          })
        }
        const manga = await db.collection('mamangas').findOne({ anilist_id })
        defaultRes.uuid = manga?.romaji || null
        if (manga?.meta_data) {
          defaultRes.meta_data = { shift: 0, ...manga.meta_data }
        }
        await db.collection('maqueues').findOneAndUpdate(
          {
            anilist_id,
            episode_no,
          },
          {
            $inc: {
              frequency: 1,
            },
            $set: {
              event_type: 'episode',
              meta_data: defaultRes.meta_data,
              romaji: defaultRes.uuid || romaji,
            },
          },
          { upsert: true, returnNewDocument: true }
        )
        return callback({
          result: defaultRes,
          status: 200,
        })
      } catch (e) {
        console.log(e)
        return callback({
          result: defaultRes,
          status: 200,
        })
      }
    },
    getManga: async function (req, { anilist_id }) {
      const db = req.app.locals.db;
      try {
        const result = await db.collection('mamangas').findOne({ anilist_id })
        if (!result) {
          return { result: 'Not Found', status: 404 }
        }
        return { result, status: 200 }
      } catch (e) {
        return { result: e, status: 400 }
      }
    },
    setManga: async function (req, { anilist_id, romaji }) {
      const db = req.app.locals.db;
      try {
        await db.collection('maepisodes').deleteMany({ anilist_id })
        const manga = {
          anilist_id,
          romaji,
        }
        await db.collection('mamangas').insertOne(manga)
        return { result: manga, status: 200 }
      } catch (e) {
        return { result: e, status: 400 }
      }
    },
    updateManga: async function (req, { anilist_id, romaji }) {
      const db = req.app.locals.db;
      try {
        await db.collection('maepisodes').deleteMany({ anilist_id })
        const result = await db.collection('mamangas').findOneAndUpdate(
          { anilist_id },
          { $set: { romaji } }
        )
        if (!result.value) {
          return { result: result.value, status: 400 }
        }
        return { result: result.value, status: 200 }
      } catch (e) {
        return { result: e, status: 400 }
      }
    },
  }
}

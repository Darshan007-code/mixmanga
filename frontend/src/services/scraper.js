import axios from 'axios'

// Using a more stable public instance
const CONSUMET_API = 'https://api-consumet-org-gamma.vercel.app/manga/mangareader'

class MangaProvider {
  constructor() {
    this.cache = new Map()
    this.idCache = new Map()
  }

  // 1. Fetch Real Chapter List using Consumet
  async getChapterList(title) {
    const cacheKey = `list-${title}`
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)

    try {
      // Search for Manga
      const searchRes = await axios.get(`${CONSUMET_API}/${title}`)
      
      if (!searchRes.data.results.length) return []
      const mangaId = searchRes.data.results[0].id
      this.idCache.set(title, mangaId)

      // Get Manga Details (includes chapters)
      const detailRes = await axios.get(`${CONSUMET_API}/info?id=${mangaId}`)
      
      const chapters = detailRes.data.chapters.map(item => ({
        id: item.id,
        chapterNum: item.number,
        title: item.title || `Chapter ${item.number}`,
      })).reverse() // Newest first

      this.cache.set(cacheKey, chapters)
      return chapters
    } catch (e) {
      console.error("Consumet List Error:", e)
      return []
    }
  }

  // 2. Fetch Images using Consumet
  async getChapterImages(mangaTitle, chapterNum) {
    const cacheKey = `img-${mangaTitle}-${chapterNum}`
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)

    try {
      let chapters = this.cache.get(`list-${mangaTitle}`)
      if (!chapters) {
        chapters = await this.getChapterList(mangaTitle)
      }

      const chapter = chapters.find(c => c.chapterNum.toString() === chapterNum.toString())
      if (!chapter) return { images: [] }

      // Get Chapter Images
      const pagesRes = await axios.get(`${CONSUMET_API}/read?chapterId=${chapter.id}`)
      
      const images = pagesRes.data.map(page => page.img)

      const result = { images, status: 200 }
      this.cache.set(cacheKey, result)
      return result
    } catch (e) {
      console.error("Consumet Image Error:", e)
      return { images: [], status: 404 }
    }
  }
}

const provider = new MangaProvider()
export default provider

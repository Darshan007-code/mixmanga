const URL = 'https://graphql.anilist.co'

// In-memory cache for instant access
const cache = new Map()

const queries = {
  carousel: `
			query ($page: Int, $perPage: Int, $search: String) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: MANGA, sort: TRENDING_DESC, isAdult: false) {
						id
						title { english romaji userPreferred native }
						startDate { year month day }
						trending
						popularity
						status
						chapters
						volumes
						description
						coverImage { large }
						bannerImage
					}
				}
			}
		`,
  recent: `
			query ($page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					media(type: MANGA, sort: UPDATED_AT_DESC, isAdult: false) {
						id
						title { romaji english userPreferred native }
						countryOfOrigin
						format
						genres
						description
						bannerImage
						coverImage { large }
						chapters
						volumes
					}
				}
			}
		`,
  trending: `
			query ($page: Int, $perPage: Int, $search: String) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, isAdult: false, type: MANGA, sort: TRENDING_DESC) {
						id
						title { english romaji userPreferred native }
						format
						startDate { year month day }
						chapters
						volumes
						updatedAt
						description
						coverImage { large }
						bannerImage
						averageScore
					}
				}
			}
		`,
  find: `
			query ($page: Int, $perPage: Int, $search: String) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: MANGA, sort: TRENDING_DESC, isAdult: false) {
						id
						title { english romaji userPreferred native }
						startDate { day month year }
						format
						status
						chapters
						volumes
						coverImage { medium }
					}
				}
			}
		`,
  details: `
			query ($id: Int) {
				Media(id: $id) {
					id
					title { english romaji userPreferred native }
					startDate { year month day }
					type
					format
					status
					chapters
					volumes
					favourites
					synonyms
					relations {
						nodes {
							id
							type
							title { romaji english }
							coverImage { large }
						}
					}
					recommendations(page: 1, perPage: 6, sort: RATING_DESC) {
						nodes {
							mediaRecommendation {
								id
								title { romaji english }
								coverImage { large }
							}
						}
					}
					genres
					averageScore
					description
					coverImage { extraLarge }
					bannerImage
				}
			}
		`,
  read: `
			query ($id: Int) {
				Media(id: $id) {
					id
					title { english romaji userPreferred native }
					startDate { year month day }
					type
					format
					status
					chapters
					volumes
					favourites
					genres
					averageScore
					description
					coverImage { extraLarge }
					bannerImage
				}
			}
		`,
  search: function (build) {
    let x = []
    for (const [k, v] of Object.entries(build)) {
      if (k == 'genre_in' || v == null) continue
      if (k == 'search') x.push(`${k}: "${v}"`)
      else x.push(`${k}: ${v}`)
    }
    if (build.genre_in && build.genre_in.length > 0) {
      x.push('genre_in: ["' + build.genre_in.join('", "') + '"]')
    }
    const params = x.length > 0 ? `, ${x.join(', ')}` : ''
    return `
			query ($page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					pageInfo { total currentPage lastPage hasNextPage perPage }
					media(type: MANGA, isAdult: false${params}) {
						id
						title { romaji english userPreferred native }
						startDate { year month }
						format
						status
						chapters
						volumes
						updatedAt
						description
						coverImage { large }
						averageScore
					}
				}
			}
			`
  },
  home: `
    query ($carouselPage: Int, $carouselPerPage: Int, $recentPage: Int, $recentPerPage: Int, $trendingPage: Int, $trendingPerPage: Int, $popularPage: Int, $popularPerPage: Int, $manhwaPage: Int, $manhwaPerPage: Int, $adultPage: Int, $adultPerPage: Int) {
      carousel: Page(page: $carouselPage, perPage: $carouselPerPage) {
        media(type: MANGA, sort: TRENDING_DESC, isAdult: false) {
          id
          title { english romaji userPreferred native }
          description
          coverImage { large }
          bannerImage
        }
      }
      recent: Page(page: $recentPage, perPage: $recentPerPage) {
        media(type: MANGA, sort: UPDATED_AT_DESC, isAdult: false) {
          id
          title { romaji english userPreferred native }
          format
          chapters
          coverImage { large }
        }
      }
      trending: Page(page: $trendingPage, perPage: $trendingPerPage) {
        media(type: MANGA, sort: TRENDING_DESC, isAdult: false) {
          id
          title { english romaji userPreferred native }
          format
          startDate { year month day }
          coverImage { large }
        }
      }
      popular: Page(page: $popularPage, perPage: $popularPerPage) {
        media(type: MANGA, sort: POPULARITY_DESC, isAdult: false) {
          id
          title { english romaji userPreferred native }
          format
          startDate { year month day }
          coverImage { large }
        }
      }
      manhwa: Page(page: $manhwaPage, perPage: $manhwaPerPage) {
        media(type: MANGA, sort: TRENDING_DESC, countryOfOrigin: "KR", isAdult: false) {
          id
          title { english romaji userPreferred native }
          format
          startDate { year month day }
          coverImage { large }
        }
      }
      adult: Page(page: $adultPage, perPage: $adultPerPage) {
        media(type: MANGA, sort: TRENDING_DESC, isAdult: true) {
          id
          title { english romaji userPreferred native }
          format
          startDate { year month day }
          coverImage { large }
        }
      }
    }
  `,
}

const Anilist = (query, variables, callback) => {
  const key = query + '-' + JSON.stringify(variables)
  
  // Instant memory check
  const cached = cache.get(key)
  if (cached && cached.time + 900000 > Date.now()) {
    callback(cached.result)
    return
  }

  // Backup localStorage check (only if memory fails)
  let cacheData = localStorage.getItem(key)
  if (cacheData) {
    cacheData = JSON.parse(cacheData)
    if (cacheData.time + 900000 > Date.now()) {
      cache.set(key, cacheData) // Promoted to memory
      callback(cacheData.result)
      return
    }
  }

  const build = variables.build
  const cleanVars = { ...variables }
  delete cleanVars.build

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: build ? queries[query](build) : queries[query],
      variables: cleanVars,
    }),
  }

  fetch(URL, options)
    .then((response) => response.json())
    .then((result) => {
      let finalResult
      if (query == 'details' || query == 'read') {
        finalResult = result.data.Media
      } else if (query == 'home') {
        finalResult = {
          carousel: result.data.carousel.media,
          recent: result.data.recent.media,
          trending: result.data.trending.media,
          popular: result.data.popular.media,
          manhwa: result.data.manhwa.media,
          adult: result.data.adult.media,
        }
      } else {
        finalResult = result.data.Page.media
      }
      
      const entry = { time: Date.now(), result: finalResult }
      cache.set(key, entry)
      localStorage.setItem(key, JSON.stringify(entry))
      callback(finalResult)
    })
    .catch(err => console.error("Anilist API Error:", err))
}

export default Anilist

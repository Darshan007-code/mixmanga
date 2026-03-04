import { PropTypes } from 'prop-types'
import MainLayout from '/src/layouts/MainLayout'
import { VscAdd, VscClose, VscPlayCircle } from 'react-icons/vsc'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { LuDot } from 'react-icons/lu'
import DefaultImage from '/src/assets/images/pic_2.jpg'
import Button from '/src/components/Button'
import { Link } from 'react-router-dom'
import { getQueryParams, dateToString } from '/src/services/untils'
import { motion } from 'framer-motion'
import backend from '/src/services/backend'
import { Context } from '/src/context'
import { useContext, useEffect, useState } from 'react'
import Error from './Error'
import { ROUTES } from '/src/services/untils'
import { useNavigate } from 'react-router'
import Chapters from '/src/Pages/Read/Chapters'

const API_ROUTES = {
  ATL: 'add-to-list',
  RFL: 'remove-from-list',
  ATF: 'add-to-favourites',
  RFF: 'remove-from-favourites',
}

const updateList = (
  type,
  { id, title, coverImage },
  user,
  setUser,
  setError
) => {
  if (!user.loggedIn) {
    setError('Login to Perform this action')
    return
  }
  const body = { id, title, coverImage }
  backend
    .post(`/api/user/${type}`, body)
    .then(({ data }) => {
      if (data.errorCode === 401) {
        setError('Login to Perform this action')
        return
      }
      if (data.error) {
        setError(data.error)
        return
      }
      setUser({
        loggedIn: true,
        loading: false,
        data,
      })
    })
    .catch((error) => {
      console.log(error)
      setError('Something went wrong')
    })
}

const Container = ({ data, onMedia: goToMedia }) => {
  const [user, setUser] = useContext(Context)
  const [error, setError] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    let interval = null
    if (error) {
      interval = setTimeout(() => {
        setError(undefined)
      }, 2000)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [error])

  const id = data.id
  const name =
    data.title.romaji ||
    data.title.english ||
    data.title.userPreferred ||
    data.title.native

  const title =
    data.title.userPreferred ||
    data.title.english ||
    data.title.romaji ||
    data.title.native
  const coverImage = data.coverImage.extraLarge
  const totalChapters = data?.chapters || '?'
  const totalVolumes = data?.volumes || '?'

  const [propState, setPropState] = useState({
    inList: user.loggedIn
      ? user.data?.userList?.filter((x) => x.id === id)?.length > 0
      : false,
    favourite: user.loggedIn
      ? user.data?.favourites?.filter((x) => x.id === id)?.length > 0
      : false,
  })

  useEffect(() => {
    setPropState({
      inList: user.loggedIn
        ? user.data?.userList?.filter((x) => x.id === id)?.length > 0
        : false,
      favourite: user.loggedIn
        ? user.data?.favourites?.filter((x) => x.id === id)?.length > 0
        : false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data])

  const recommendations = data.recommendations.nodes
  const relations = data.relations.nodes.filter(
    (x) => x.type == 'MANGA' || x.type == 'ONE_SHOT'
  )

  const handleChapterClick = (chapterNum) => {
    navigate(ROUTES.READ + getQueryParams({ id, name, episode: chapterNum }))
  }

  return (
    <MainLayout>
      <Error error={error} />
      <div>
        <div
          className="banner-image"
          style={{
            background: `linear-gradient(to right, rgba(1, 1, 1, 0.3) 90%, rgba(1, 1, 1, 0.3) 90%, rgba(1, 1, 1, 0.3) 90%), url(${
              data.bannerImage || DefaultImage
            })`,
          }}
        ></div>
        <div className="lg:m-20 m-5 lg:mt-5 lg:flex md:flex justify-between">
          <div className="xl:w-2/12 lg:w-3/12 md:w-3/12 w-full py-3">
            <div className="lg:block md:block flex justify-between">
              <div className="lg:w-full md:w-full w-6/12 a-center">
                <div
                  className="cover-image rounded-md"
                  style={{
                    backgroundImage: `url(${coverImage})`,
                  }}
                ></div>
              </div>
              <div className="w-6/12 md:w-full py-3 px-3 md:px-0 flex flex-col">
                <div className="md:flex justify-between">
                  {propState.inList ? (
                    <div className="w-full md:w-10/12 md:pr-1">
                      <Button
                        style={{
                          width: '100%',
                          color: '#0f172a',
                          backgroundColor: '#d1d5db',
                          paddingLeft: 'auto',
                          paddingRight: 'auto',
                        }}
                        hoverStyle={{
                          color: '#111827',
                          backgroundColor: '#e5e7eb',
                        }}
                        onClick={() =>
                          updateList(
                            API_ROUTES.RFL,
                            { id },
                            user,
                            setUser,
                            setError
                          )
                        }
                      >
                        <div className="flex justify-center w-full">
                          <VscClose className="text-lg mr-1" />
                          <span className="normal-case mt-[1px] tracking-wide">
                            Remove
                          </span>
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full md:w-10/12 md:pr-1">
                      <Button
                        style={{
                          width: '100%',
                          color: '#111827',
                          backgroundColor: '#e5e7ebee',
                          paddingLeft: 'auto',
                          paddingRight: 'auto',
                        }}
                        hoverStyle={{
                          color: '#111827',
                          backgroundColor: '#e5e7eb',
                        }}
                        onClick={() =>
                          updateList(
                            API_ROUTES.ATL,
                            { id, title, coverImage },
                            user,
                            setUser,
                            setError
                          )
                        }
                      >
                        <div className="flex justify-center w-full">
                          <VscAdd className="text-lg mr-1" />
                          <span className="normal-case mt-[1px] tracking-wide">
                            Add to List
                          </span>
                        </div>
                      </Button>
                    </div>
                  )}
                  {propState.favourite ? (
                    <div className="w-full mt-1 md:w-2/12 md:mt-0">
                      <Button
                        style={{
                          width: '100%',
                          height: '100%',
                          color: '#111827',
                          backgroundColor: '#fca5a5',
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                        onClick={() =>
                          updateList(
                            API_ROUTES.RFF,
                            { id },
                            user,
                            setUser,
                            setError
                          )
                        }
                      >
                        <GoHeart className="w-full text-lg p-auto" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full mt-1 md:w-2/12 md:mt-0">
                      <Button
                        style={{
                          width: '100%',
                          height: '100%',
                          color: '#1f2937',
                          backgroundColor: '#ff3d00',
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                        onClick={() =>
                          updateList(
                            API_ROUTES.ATF,
                            { id, title, coverImage },
                            user,
                            setUser,
                            setError
                          )
                        }
                      >
                        <GoHeartFill className="w-full text-lg p-auto" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-10/12 lg:w-9/12 md:w-9/12 w-full p-5">
            <h1 className="capitalize text-2xl pb-3 text-slate-200">
              {title.toLowerCase()}
            </h1>
            <div className="flex">
              <div className="a-center">
                <span className="border rounded-md bg-slate-200 ring-2 ring-gray-200 text-slate-800 px-3 text-gap-2">
                  {data.format}
                </span>
              </div>
              <span className="a-center">
                <LuDot className="text-2xl text-slate-200" />
              </span>
              <div className="a-center">
                <span className="rounded-md ring-2 ring-gray-200 text-slate-200 pl-[6px] pr-1 text-gap-2 uppercase">
                  {data.status}
                </span>
              </div>
              <span className="a-center">
                <LuDot className="text-2xl text-slate-200" />
              </span>
              <div className="a-center">
                <span
                  className="text-slate-200 text-gap-2"
                  style={{
                    fontSize: 13,
                  }}
                >
                  {totalChapters} Chapters
                </span>
              </div>
              <span className="a-center">
                <LuDot className="text-2xl text-slate-200" />
              </span>
              <div className="a-center">
                <span className="text-slate-200 text-sm">
                  {totalVolumes} Volumes
                </span>
              </div>
            </div>
            <div className="mt-5">
              <p
                className="text-[13px] text-slate-200"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></p>
            </div>
          </div>
        </div>
        <div className="m-5 lg:m-20 block md:flex">
          <div className="w-full md:w-3/12 mt-4">
            <div className="mx-1">
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Format :</span>
                <span className="mx-2">{data.format}</span>
              </p>
              <hr className="text-slate-200 mb-3" />
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">English Title :</span>
                <span className="mx-2">{data.title?.english}</span>
              </p>
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Romaji Title :</span>
                <span className="mx-2">{data.title?.romaji}</span>
              </p>
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">User Prefered Title :</span>
                <span className="mx-2">{data.title?.userPreferred}</span>
              </p>
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Native Title :</span>
                <span className="mx-2">{data.title?.native}</span>
              </p>
              <hr className="mb-3 text-slate-200" />
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Started On :</span>
                <span className="mx-2">
                  {dateToString(
                    data.startDate?.year,
                    data.startDate?.month,
                    data.startDate?.day
                  )}
                </span>
              </p>
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Status :</span>
                <span className="mx-2">{data.status.split('_').join(' ')}</span>
              </p>
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Total Chapters :</span>
                <span className="mx-2">{totalChapters || '?'}</span>
              </p>
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Total Volumes :</span>
                <span className="mx-2">{totalVolumes || '?'}</span>
              </p>
              <hr className="text-slate-200 mb-3" />
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Genres :</span>
                <span className="mx-2">{data.genres?.join(', ')}</span>
              </p>
              <hr className="text-slate-200 mb-3" />
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Average Score :</span>
                <span className="mx-2">{data.averageScore}</span>
              </p>
              <p className="text-slate-200 p-0 mb-3 text-xs">
                <span className="text-sgreen">Favourites :</span>
                <span className="mx-2">{data.favourites}</span>
              </p>
              <hr className="text-slate-200 mb-3" />
              <p className="text-slate-200 p-0 mb-3 text-xs text-sgreen">
                Synonyms :
              </p>
              {data.synonyms.map((x, index) => (
                <p
                  key={`syn-${index}`}
                  className="text-slate-200 p-0 mb-3 text-xs"
                >
                  {x}
                </p>
              ))}
            </div>
          </div>
          <div className="vr mx-1 hidden md:inline-flex"></div>
          <div className="w-full md:w-9/12 mt-8 md:mt-2 md:mx-2">
            <div className="glass glass-hard p-6 mb-8 rounded-2xl">
              <Chapters 
                mangaTitle={name}
                setChapter={handleChapterClick} 
              />
            </div>
            <p className="text-gap-2 text-sgreen md:pl-2">Recommendations</p>
            {!recommendations || recommendations.length === 0 ? (
              <div className="a-center h-[120px]">
                <h1 className="text-gap-2 text-slate-200">Nothing Avaliable</h1>
              </div>
            ) : (
              <div className="grid lg:grid-cols-6 grid-cols-3 justify-center">
                {recommendations.map((node, index) => (
                  <div key={`rec-${index}`} className="m-0 px-1 pt-3">
                    <motion.div
                      className="w-full h-full glass glass-hard"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-full h-full">
                        <div
                          onClick={() =>
                            goToMedia({ id: node.mediaRecommendation.id })
                          }
                        >
                          <img
                            loading="lazy"
                            className="rounded aspect-[2/3]"
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                            src={node.mediaRecommendation?.coverImage?.large}
                            alt=""
                          />
                        </div>
                        <p
                          className="truncate text-xs text-gray-200 mt-1"
                          style={{
                            fontWeight: '400',
                          }}
                        >
                          {node.mediaRecommendation?.title?.english ||
                            node.mediaRecommendation?.title?.romaji}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-gap-2 text-sgreen mt-8 md:pl-2">Relative</p>
            {!relations || relations.length === 0 ? (
              <div className="a-center h-[120px]">
                <h1 className="text-gap-2 text-slate-200">Nothing Avaliable</h1>
              </div>
            ) : (
              <div
                className="relative grid lg:grid-cols-6 grid-cols-3 justify-center pb-3"
                style={{
                  overflowY: 'scroll',
                }}
              >
                {relations.map((node, index) => (
                  <div key={`rel-${index}`} className="m-0 px-1 pt-3">
                    <motion.div
                      className="w-full h-full glass glass-hard"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div onClick={() => goToMedia({ id: node.id })}>
                        <div className="recommend">
                          <img
                            loading="lazy"
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                            className="rounded aspect-[2/3]"
                            src={node.coverImage.large}
                            alt=""
                          />
                        </div>
                        <p
                          className="truncate text-xs text-slate-200 mt-1"
                          style={{
                            fontWeight: '400',
                          }}
                        >
                          {node.title?.english || node.title?.romaji}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[150px]"></div>
    </MainLayout>
  )
}

Container.propTypes = {
  data: PropTypes.any,
  onMedia: PropTypes.any.isRequired,
}

export default Container

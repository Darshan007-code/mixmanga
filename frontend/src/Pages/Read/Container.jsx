import { PropTypes } from 'prop-types'
import Reader from './Reader'
import Info from './Info'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { getQueryParams } from '/src/services/untils'
import provider from '/src/services/scraper'
import { ROUTES, getAiredUpTo } from '/src/services/untils'
import Modal from '/src/components/Modal'
import { BiSearchAlt } from 'react-icons/bi'

const getChapterData = async ({ title, chapter, callback }) => {
  const data = await provider.getChapterImages(title, chapter)
  callback(data)
}

const Container = ({ data }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const name = query.get('name')
  const [chapter, setChapter] = useState(parseInt(query.get('episode')) || 1)
  const [readData, setReadData] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [chapterToFind, setChapterToFind] = useState('')

  const inputRef = useRef(null)

  const id = data.id
  const romaji = data.title.romaji || data.title.english || data.title.userPreferred
  const airedUpTo = data?.chapters || 1000 // Fallback for ongoing manga

  const setCurrentChapter = (value, flag = true) => {
    const chapNum = parseInt(value)
    if (chapNum > 0) {
      if (flag) {
        navigate(ROUTES.READ + getQueryParams({ name, id, episode: chapNum }))
      }
      setChapter(chapNum)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    setReadData(null)
    getChapterData({
      title: romaji,
      chapter,
      callback: (response) => {
        setReadData(response)
      },
    })
  }, [chapter, romaji])


  useEffect(() => {
    if (showModal) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timeout)
    }
  }, [showModal])

  useEffect(() => {
    const episode = Math.max(query.get('episode'), 1) || 1
    setCurrentChapter(episode, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    const handleKeyBinding = (event) => {
      if (event.shiftKey) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            setCurrentChapter(chapter - 1)
            break
          case 'ArrowRight':
            event.preventDefault()
            setCurrentChapter(chapter + 1)
            break
        }
      } else {
        switch (event.key) {
          case '/':
            setShowModal(true)
            break
          case 'Escape':
            setShowModal(false)
            break
        }
      }
    }
    addEventListener('keydown', handleKeyBinding)
    return () => {
      removeEventListener('keydown', handleKeyBinding)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter])

  const handleChapterSubmit = () => {
    setShowModal(false)
    setCurrentChapter(chapterToFind)
    setChapterToFind('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleModalInput = (value) => {
    if (value !== '') {
      value = Math.max(1, value)
      value = Math.min(airedUpTo, value)
    }
    setChapterToFind(value)
  }

  return (
    <>
      <Modal close={!showModal} closeModal={() => setShowModal(false)}>
        <div className="w-[280px]">
          <form onSubmit={handleChapterSubmit}>
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <BiSearchAlt className="text-gray-400 text-lg" />
              </div>
              <input
                type="number"
                name="episode_no"
                value={chapterToFind}
                onChange={(e) => handleModalInput(e.target.value)}
                ref={inputRef}
                className="h-8 w-[270px] bg-transparent py-2 pl-10 pr-5 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                placeholder="Enter Chapter no."
              />
            </div>
            <div className="flex pt-5 justify-end px-3">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2
                  rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm
                  transition ease-in-out duration-150
                  text-[#111827] bg-[#cbd5e1cc]
                  hover:bg-[#e5e7ebee]
                  disabled:opacity-25"
              >
                <div className="flex justify-center">
                  <div className="mr-1 a-center">
                    <span className="text-xs inline-flex">Go To Chapter</span>
                  </div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="xl:container">
        <div className="mx-3 pt-2 flex">
          <div className="w-[120px]">
            <p
              className="pl-3 text-gray-200 text-gap-2 uppercase"
              style={{
                fontSize: 10,
              }}
            >
              Manga <span className="text-sgreen">Name</span>
            </p>
            <p
              className="pl-3 text-gray-200 text-gap-2 uppercase"
              style={{
                fontSize: 10,
              }}
            >
              CHAPTER <span className="text-sgreen">No.</span>
            </p>
          </div>
          <div className="truncate">
            <p
              className="pr-3 text-gray-200 text-gap-2 uppercase truncate"
              style={{
                fontSize: 10,
              }}
            >
              <span className="px-1">:</span> {romaji}
            </p>
            <p
              className="pr-3 text-gray-200 text-gap-2 uppercase"
              style={{
                fontSize: 10,
              }}
            >
              <span className="px-1">:</span> {chapter}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Reader
          data={readData}
          chapter={chapter}
          prevChapter={() => setCurrentChapter(chapter - 1)}
          nextChapter={() => setCurrentChapter(chapter + 1)}
        />
        <Info setChapter={setCurrentChapter} data={data} />
      </div>
    </>
  )
}

Container.propTypes = {
  data: PropTypes.any,
}

export default Container

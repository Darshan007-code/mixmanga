import { PropTypes } from 'prop-types'
import { debounce } from 'lodash'
import Anilist from '/src/services/anilist.js'
import Modal from '/src/components/Modal'
import { useEffect, useRef, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import MangaList from './MangaList'

const findManga = debounce((value, previous, setLoading, callback) => {
  value = value.trim()
  if (value === '' || value === previous || value === '/') {
    return
  }
  callback(null)
  setLoading(true)
  Anilist(
    'find',
    {
      page: 1,
      perPage: 6,
      search: value,
    },
    (data) => {
      setTimeout(() => {
        callback(data)
        setLoading(false)
      }, 500)
    }
  )
}, 500)

const FindManga = ({ close = true, closeButton }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState(null)

  const queryInputRef = useRef(null)

  useEffect(() => {
    queryInputRef.current?.focus()
    const timeout = setTimeout(() => {
      setQuery('')
    }, 0)
    return () => clearTimeout(timeout)
  }, [])

  const handleQueryChange = (e) => {
    const value = e.target.value || ''
    setQuery(value)
    findManga(value, query, setLoading, (data) => {
      setList(data)
    })
  }

  return (
    <Modal
      close={close}
      closeModal={closeButton}
      style={{
        marginTop: -100,
        background: '#042f2e44',
        border: '3px solid #042f2e',
      }}
    >
      <div>
        <div className="px-3 a-center w-full">
          <div className="relative">
            <div className="absolute h-10 left-0 px-3 a-center">
              <BiSearchAlt className="text-gray-400 text-lg" />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              ref={queryInputRef}
              className="h-10 w-[270px] sm:w-[450px] md:w-[600px]
                  bg-transparent py-2 pl-10 pr-5 text-gray-200
                  rounded-lg ring-2 ring-teal-300 focus:ring-2
                  tracking-wide text-sm"
              placeholder="Search manga here..."
            />
          </div>
        </div>
        <MangaList loading={loading} list={list} closeButton={closeButton} />
      </div>
    </Modal>
  )
}

FindManga.propTypes = {
  close: PropTypes.boolean,
  closeButton: PropTypes.any,
}

export default FindManga

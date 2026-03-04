import { PropTypes } from 'prop-types'
import Button from '/src/components/Button'
import { VscClose } from 'react-icons/vsc'
import { LuSearch } from 'react-icons/lu'
import { useEffect, useRef, useState } from 'react'
import Anilist from '/src/services/anilist.js'
import { debounce } from 'lodash'
import { motion } from 'framer-motion'
import EmptyQuery from './EmptyQuery'
import MangaList from './MangaList'

const findManga = debounce((value, previous, setLoading, callback) => {
  value = value.trim()
  setLoading(true)
  callback(null)
  if (value === '' || value === previous) {
    setLoading(false)
    return
  }
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

const Find = ({ toggleFind: closeButton }) => {
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
  const handleClose = () => {
    setQuery('')
  }

  return (
    <motion.div
      className="relative w-screen h-screen"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute left-0 top-0 w-screen h-screen z-[5] overflow-y-scroll">
        <div className="flex justify-end px-5 pt-5">
          <Button btnType="icon" onClick={closeButton}>
            <VscClose className="text-xl" />
          </Button>
        </div>
        <div className="flex mt-3 px-5">
          <motion.div
            className="ml-3 relative"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute h-8 left-0 px-3 a-center">
              <LuSearch className="text-gray-400" />
            </div>
            <div className="absolute h-8 right-0 px-3 a-center">
              {query?.length > 0 && (
                <button onClick={handleClose}>
                  <VscClose className="text-gray-200" />
                </button>
              )}
            </div>
            <input
              type="text"
              value={query}
              ref={queryInputRef}
              onChange={handleQueryChange}
              className="h-8 w-[250px] md:w-[300px] bg-transparent py-2 px-8 text-gray-200
              rounded-3xl ring-2 ring-teal-900 focus:ring-2 focus:ring-teal-600
              tracking-wide text-xs"
              placeholder="Search..."
            />
          </motion.div>
        </div>
        <div className="w-full mt-8">
          {query?.length > 0 ? (
            <MangaList
              closeButton={closeButton}
              list={list}
              loading={loading}
            />
          ) : (
            <EmptyQuery />
          )}
        </div>
      </div>
    </motion.div>
  )
}

Find.propTypes = {
  toggleFind: PropTypes.any,
}

export default Find

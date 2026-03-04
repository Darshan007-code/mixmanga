import { PropTypes } from 'prop-types'
import Button from '/src/components/Button'
import { motion } from 'framer-motion'
import { VscClose } from 'react-icons/vsc'
import { BiSearchAlt } from 'react-icons/bi'
import Select from './Select'
import { useEffect, useState, useRef } from 'react'

const Filter = ({ filter, setFilter, defaultFilter, close }) => {
  const year = new Date().getFullYear()
  const years = []
  for (let i = 1938; i < year + 2; ++i) {
    if (i === 1938) {
      years.push({ name: 'Any', value: '' })
    } else {
      years.push({ name: i, value: i })
    }
  }
  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Ecchi',
    'Fantasy',
    'Horror',
    'Mahou Shoujo',
    'Mecha',
    'Music',
    'Mystery',
    'Psychological',
    'Romance',
    'Sci-Fi',
    'Slice Of Life',
    'Sports',
    'Supernatural',
    'Thriller',
  ]

  const [state, setState] = useState(filter)
  const queryInputRef = useRef(null)

  const clearText = () => {
    setState({ ...state, manganame: '' })
  }
  const clearFilter = () => {
    setState(defaultFilter())
    setFilter(defaultFilter())
    close()
  }
  const handleSubmit = () => {
    setFilter(state)
    close()
  }

  useEffect(() => {
    queryInputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyBinding = (event) => {
      switch (event.key) {
        case 'Enter':
          handleSubmit()
          break
      }
    }
    addEventListener('keydown', handleKeyBinding)
    return () => {
      removeEventListener('keydown', handleKeyBinding)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const handleName = (event) => {
    setState({ ...state, manganame: event.target.value })
  }
  const handleCountry = (country) => {
    setState({ ...state, country })
  }
  const handleFormat = (format) => {
    setState({ ...state, format })
  }
  const handleYear = (year) => {
    setState({ ...state, year })
  }
  const handleSorting = (sort) => {
    setState({ ...state, sort })
  }
  const handleStatus = (status) => {
    setState({ ...state, status })
  }
  const handleAverageScore = (averageScore) => {
    setState({ ...state, averageScore })
  }
  const handleCheck = (event) => {
    const value = event.target.value
    const checked = event.target.checked
    if (checked) {
      setState({ ...state, genres: { ...state.genres, [value]: true } })
    } else {
      const genres = state.genres
      delete genres[value]
      setState({ ...state, genres })
    }
  }

  return (
    <div
      className="h-[70vh] overflow-y-scroll filter-width z-[5]"
      style={{
        mask: 'linear-gradient(transparent, white 2%, white 98%, transparent)',
      }}
    >
      <div className="flex justify-center">
        <div>
          <div className="mt-3 a-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute h-10 left-0 pl-3 pr-5 a-center">
                <BiSearchAlt className="text-gray-400" />
              </div>
              <div className="absolute h-10 right-0 pl-5 pr-3 a-center">
                {state.manganame && state.manganame.length > 0 && (
                  <button onClick={clearText}>
                    <VscClose className="text-gray-200" />
                  </button>
                )}
              </div>
              <input
                type="text"
                ref={queryInputRef}
                value={state.manganame}
                onChange={handleName}
                className="h-10 w-[290px] sm:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-xs"
                placeholder="Search Manga here..."
              />
            </motion.div>
          </div>
          <div className="px-1 mt-5 w-[310px]">
            <Select
              id="COO"
              label="Country Of Origin"
              options={[
                { name: 'Any', value: '' },
                { name: 'Japan', value: 'JP' },
                { name: 'China', value: 'CN' },
                { name: 'Korea', value: 'KR' },
              ]}
              item={state.country}
              setItem={handleCountry}
            />
          </div>
          <div className="flex justify-between w-[310px]">
            <div className="px-1 mt-3 w-full">
              <Select
                id="format"
                label="Format"
                options={[
                  { name: 'Any', value: '' },
                  { name: 'Manga', value: 'MANGA' },
                  { name: 'One Shot', value: 'ONE_SHOT' },
                  { name: 'Novel', value: 'NOVEL' },
                ]}
                item={state.format}
                setItem={handleFormat}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-around w-[310px] mt-2">
            {genres.map((genre, index) => (
              <span className="w-5/12 py-1" key={`genre-${index}`}>
                <label className="checkbox">
                  <span className="checkbox__label text-gray-200 text-xs font-normal tracking-wider">
                    {genre}
                  </span>
                  <input
                    type="checkbox"
                    checked={state.genres[genre]}
                    value={genre}
                    onChange={handleCheck}
                    name="genre"
                  />
                  <div className="checkbox__indicator"></div>
                </label>
              </span>
            ))}
          </div>
          <div className="flex justify-between w-[310px]">
            <div className="px-1 mt-3 w-1/2">
              <Select
                id="year"
                label="Year"
                options={years}
                item={state.year}
                setItem={handleYear}
              />
            </div>
            <div className="px-1 mt-3 w-1/2">
              <Select
                id="sorting"
                label="Sorting"
                options={[
                  { name: 'Any', value: '' },
                  { name: 'Ascending', value: 'TITLE_ENGLISH' },
                  { name: 'Descending', value: 'TITLE_ENGLISH_DESC' },
                  { name: 'Newly Added', value: 'START_DATE_DESC' },
                  { name: 'Rating Low to High', value: 'POPULARITY' },
                  { name: 'Rating High to Low', value: 'POPULARITY_DESC' },
                ]}
                item={state.sort}
                setItem={handleSorting}
              />
            </div>
          </div>
          <div className="flex justify-between w-[310px]">
            <div className="px-1 mt-3 w-1/2">
              <Select
                id="status"
                label="Status"
                options={[
                  { name: 'Any', value: '' },
                  { name: 'Airing', value: 'RELEASING' },
                  { name: 'Finished', value: 'FINISHED' },
                  { name: 'Not Yet Aired', value: 'NOT_YET_RELEASED' },
                  { name: 'Cancelled', value: 'CANCELLED' },
                  { name: 'Halted', value: 'HIATUS' },
                ]}
                item={state.status}
                setItem={handleStatus}
              />
            </div>
            <div className="px-1 mt-3 w-1/2">
              <Select
                id="averageScore"
                label="Average Score"
                options={[
                  { name: 'any', value: '-1' },
                  { name: 'Greater than 50', value: '50' },
                  { name: 'Greater than 60', value: '60' },
                  { name: 'Greater than 70', value: '70' },
                  { name: 'Greater than 80', value: '80' },
                  { name: 'Greater than 90', value: '90' },
                ]}
                item={state.averageScore}
                setItem={handleAverageScore}
              />
            </div>
          </div>
          <div className="flex justify-between my-5 px-2">
            <Button
              style={{
                color: '#e5e7eb',
                backgroundColor: '#1e293b55',
              }}
              onClick={clearFilter}
            >
              <span>Clear</span>
            </Button>
            <Button
              style={{
                color: '#1f2937',
                backgroundColor: '#e5e7eb',
              }}
              onClick={handleSubmit}
            >
              <span>Filter</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.any,
  setFilter: PropTypes.any,
  close: PropTypes.any,
  defaultFilter: PropTypes.any,
}

export default Filter

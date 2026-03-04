import { memo, useEffect, useRef, useState } from 'react'
import { PropTypes } from 'prop-types'
import Lottie from 'react-lottie'
import { motion } from 'framer-motion'
import Button from '/src/components/Button'
import { Link } from 'react-router-dom'
import BookFindAnimation from '/src/assets/animations/book_find.json'
import { getQueryParams, ROUTES, truncate } from '/src/services/untils'
import { VscPlay } from 'react-icons/vsc'
import { GoMultiSelect } from 'react-icons/go'
import { useNavigate } from 'react-router'

const MangaList = ({ list, loading, closeButton }) => {
  const [selected, setSelected] = useState(0)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const bookFindOptions = {
    loop: true,
    autoplay: true,
    animationData: BookFindAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  useEffect(() => {
    if (loading || list?.length === 0) {
      return
    }
    const handleKeyBinding = (event) => {
      const container = containerRef.current
      switch (event.key) {
        case 'ArrowUp':
          container.scrollBy({ top: -158, behavior: 'smooth' })
          if (selected > 0) {
            event.preventDefault()
            setSelected(selected - 1)
          }
          break
        case 'ArrowDown':
          container.scrollBy({ top: 158, behavior: 'smooth' })
          if (selected + 1 < list.length) {
            event.preventDefault()
            setSelected(selected + 1)
          }
          break
        case 'Enter':
          navigate(ROUTES.DETAILS + getQueryParams({ id: list[selected].id }))
          closeButton()
          break
      }
    }
    addEventListener('keydown', handleKeyBinding)
    return () => {
      removeEventListener('keydown', handleKeyBinding)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, loading, selected])

  if (loading) {
    return (
      <div className="a-center">
        <div className="w-[300px]">
          <Lottie style={{ cursor: 'default' }} options={bookFindOptions} />
        </div>
      </div>
    )
  }

  if (list && list.length === 0) {
    return (
      <div className="a-center pt-[50px] pb-[30px]">
        <p
          className="text-slate-200 text-sm side-heading"
          style={{ textTransform: 'none', fontWeight: 400 }}
        >
          - Nothing <span className="text-sgreen">found!!</span> -
        </p>
      </div>
    )
  }

  const getMangaRow = ({ data = {}, index = 0 }) => {
    const title =
      data.title?.romaji ||
      data.title?.userPreferred ||
      data.title?.english ||
      data.title?.native
    const startDate = `${data.startDate.day || '01'}/${
      data.startDate.month || '01'
    }/${data.startDate.year || '1990'}`
    const format = data.format?.replaceAll('_', ' ') || 'MANGA'

    const details = {
      Title: title,
      'Started on': startDate,
      Format: format,
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: index / 10 }}
        className="w-full p-2"
      >
        <div className="bg-[#02061744] rounded-md flex justify-between h-[150px] p-2 px-4">
          <div className="h-full aspect-[3/4]">
            <img
              className="object-cover rounded-md h-full w-full"
              src={data.coverImage?.medium || data.coverImage?.large}
              loading="lazy"
            />
          </div>
          <div className="v-center" style={{ width: 'calc(100% - 120px)' }}>
            {Object.entries(details).map(([key, value], index) => (
              <div
                key={`search-card-${index}`}
                className="flex pl-4 pr-2 py-[2px] text-xs"
              >
                <p className="w-[85px] tracking-wide text-sgreen">{key}:</p>
                <p className="text-slate-100">{truncate(value, 50)}</p>
              </div>
            ))}
            <div className="flex justify-end pl-4 pr-2 py-1 text-xs">
              {index === selected && (
                <div className="hidden md:inline-flex a-center px-2">
                  <Button
                    style={{
                      color: '#cbd5e1',
                      backgroundColor: '#000000',
                    }}
                  >
                    <GoMultiSelect className="mr-2 text-md" />
                    <span className="text-slate-100">select</span>
                  </Button>
                </div>
              )}
              <Link
                to={{
                  pathname: ROUTES.DETAILS,
                  search: getQueryParams({ id: data.id }),
                }}
                onClick={closeButton}
              >
                <Button
                  style={{
                    height: 30,
                    color: index === selected ? '#111827' : '#cbd5e1',
                    backgroundColor: index === selected ? '#5eead4' : '#000000',
                  }}
                  hoverStyle={{
                    color: '#111827',
                    backgroundColor: '#5eead4',
                  }}
                >
                  <VscPlay className="mr-2 text-md" />
                  <span>Details</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return list ? (
    <div
      ref={containerRef}
      className="p-2 h-[400px] overflow-y-scroll"
      style={{
        mask: 'linear-gradient(transparent, white 2%, white 98%, transparent)',
      }}
    >
      {list?.map((data, index) => getMangaRow({ data, index }))}
    </div>
  ) : (
    <div className="pb-5"></div>
  )
}

MangaList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  closeButton: PropTypes.any,
}

const MemoMangaList = memo(MangaList)

export default MemoMangaList

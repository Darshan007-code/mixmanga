import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import { ROUTES } from '/src/services/untils'

const Season = ({ data, index }) => {
  const startDate =
    (data.startDate.day || '1') +
    '/' +
    (data.startDate.month || '01') +
    '/' +
    (data.startDate.year || '1990')
  const background = data.coverImage.large || data.coverImage.extraLarge || data.coverImage.medium
  const format = data.format?.replaceAll('_', ' ') || 'TV'
  const title =
    data.title.userPreferred ||
    data.title.english ||
    data.title.romaji ||
    data.title.native

  const variants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: (index % 6) * 0.05,
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      className="hidden-season-card lg:w-1/6 md:w-1/4 sm:w-1/4 w-1/3 p-1"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={{
          pathname: ROUTES.DETAILS,
          search: getQueryParams({ id: data.id }),
        }}
      >
        <div
          className="glass glass-hard w-full"
          style={{
            padding: 5,
          }}
        >
          <div className="aspect-[2/3] md:aspect-[2/3] lg:aspect-[2/3] p-[1px] md:p-1">
            <div
              className="background w-full h-full relative p-2 rounded-lg"
              style={{
                backgroundImage: `url(${background})`,
              }}
            >
              <div className="rounded-sm bg-[#5de4b5] absolute top-2 left-2 bg-opacity-80 px-2 text-[12px] md:text-[15px] font-[550]">
                {format}
              </div>
            </div>
          </div>
          <div className="p-[1px] md:p-1">
            <p className="pt-2 text-[10px] md:text-[11px] text-slate-200 flex justify-between">
              <span>
                Started{' '}
                <span className="lg:inline-flex md:inline-flex hidden">
                  on
                </span>
                :
              </span>
              <span className="text-right">{startDate}</span>
            </p>
            <h1 className="truncate text-[11px] md:text-[13px] pt-1 font-normal text-sgreen">
              {title}
            </h1>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

Season.propTypes = {
  data: PropTypes.any,
  index: PropTypes.number,
}

const MemoSeason = memo(Season)

export default MemoSeason

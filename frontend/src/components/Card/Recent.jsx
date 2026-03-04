import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getQueryParams, getDate } from '/src/services/untils'
import { ROUTES } from '/src/services/untils'

const MAX_TITLE_SIZE = 25

const Recent = ({ data = {}, index = 0 }) => {
  const id = data.id
  const name =
    data.title.romaji ||
    data.title.english ||
    data.title.userPreferred ||
    data.title.native
  let title =
    data.title.userPreferred ||
    data.title.english ||
    data.title.romaji ||
    data.title.native
  if (title.length > MAX_TITLE_SIZE) {
    title = title.slice(0, MAX_TITLE_SIZE - 3) + '...'
  }
  const chapters = data.chapters || '?'
  const background = data.coverImage.large || data.coverImage.extraLarge || data.coverImage.medium
  const format = data.format.replaceAll('_', ' ')

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: (index % 12) * 0.05,
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className="cursor-pointer hidden-recent-card h-full lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        to={{
          pathname: ROUTES.DETAILS,
          search: getQueryParams({ id, name }),
        }}
      >
        <div className="p-1 glass glass-hard w-full h-full">
          <div
            className="background aspect-[7/5] md:aspect-[8/5] lg:aspect-[9/5] relative p-2 rounded-lg"
            style={{
              backgroundImage: `url(${background})`,
            }}
          >
            <div className="rounded-sm bg-[#5de4b5] absolute top-2 left-2 bg-opacity-80 px-2 text-[12px] md:text-[15px] font-[550]">
              {format}
            </div>
          </div>
          <h1 className="text-[11px] md:text-[12px] pt-2 flex justify-between text-gray-100">
            <span>Chapters:</span>
            <span>{chapters}</span>
          </h1>
          <h1 className="text-[11px] md:text-sm pt-1 font-normal text-sgreen">
            {title}
          </h1>
        </div>
      </Link>
    </motion.div>
  )
}

Recent.propTypes = {
  data: PropTypes.any,
  index: PropTypes.number,
}

const MemoRecent = memo(Recent)

export default MemoRecent

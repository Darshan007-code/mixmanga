import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { getDate, truncate, getQueryParams } from '/src/services/untils'
import { HiCalendarDays } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '/src/services/untils'

const Schedule = ({ data }) => {
  const id = data.media.id
  const date = getDate(data.airingAt)
  const title = data.media.title.english || data.media.title.romaji
  const image = data.media.coverImage.extraLarge
  const format = data.media.format?.split('_')?.join(' ') || 'NA'
  const duration = data.media.duration || 23
  const country = data.media.countryOfOrigin
  const episode = data.episode

  return (
    <div className="relative py-5 mb-6 sm:mb-0">
      <div className="cursor-pointer min-w-[300px] flex items-center">
        <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-[5px] bg-sgreen ring-[#ffffff44] shrink-0">
          <HiCalendarDays className="text-md" />
        </div>
        <div className="w-full h-[3px] bg-[#ffffff44] mx-[5px]"></div>
      </div>
      <div className="mt-3 h-fit pr-8">
        <h3 className="text-sm truncate cursor-pointer font-semibold text-slate-200 pb-1">
          {truncate(title, 40)}
        </h3>
        <time className="block mb-2 text-[13px] font-normal leading-none text-slate-300 pb-2">
          Releases on <span className="text-sgreen">{date}</span>
        </time>
        <div className="w-full flex justify-between mb-2">
          <motion.div
            className="w-[150px] aspect-[3/4]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={{
                pathname: ROUTES.DETAILS,
                search: getQueryParams({ id }),
              }}
            >
              <img
                className="cursor-pointer w-full h-full rounded-lg"
                src={image}
                alt=""
              />
            </Link>
          </motion.div>
          <div>
            <span className="block pt-1 text-xs text-slate-200">
              Format: <span className="text-sgreen">{format}</span>
            </span>
            <span className="block pt-1 text-xs text-slate-200">
              Duration: <span className="text-sgreen">{duration} min</span>
            </span>
            <span className="block pt-1 text-xs text-slate-200">
              Country: <span className="text-sgreen">{country}</span>
            </span>
            <span className="block pt-1 text-xs text-slate-200">
              Episode: <span className="text-sgreen">{episode}</span>
            </span>
          </div>
        </div>
        <p
          className="text-xs font-normal text-slate-300"
          type="desc"
          dangerouslySetInnerHTML={{
            __html: truncate(data.media.description, 200),
          }}
        ></p>
      </div>
    </div>
  )
}

Schedule.propTypes = {
  data: PropTypes.any,
}

const MemoSchedule = memo(Schedule)

export default MemoSchedule

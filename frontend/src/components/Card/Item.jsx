import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import { ROUTES } from '/src/services/untils'

const Item = ({ data, index = 0 }) => {
  const id = data.id
  const background = data.coverImage?.large || data.coverImage?.extraLarge || data.coverImage?.medium || data.coverImage
  const title = data.title

  const variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: (index % 10) * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className="p-1 aspect-[2/3]"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <Link
        to={{
          pathname: ROUTES.DETAILS,
          search: getQueryParams({ id }),
        }}
      >
        <div
          className="glass glass-hard w-full"
          style={{
            padding: 5,
            paddingBottom: 3,
          }}
        >
          <div className="w-[120px] aspect-[2/3] p-[1px] md:p-1">
            <div
              className="background w-full h-full relative p-2 rounded-lg"
              style={{
                backgroundImage: `url(${background})`,
              }}
            ></div>
          </div>
          <div className="w-[120px] p-[1px] md:p-1">
            <p
              className="truncate text-gap-2 text-gray-200"
              style={{
                fontSize: 10,
              }}
            >
              {title}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

Item.propTypes = {
  data: PropTypes.any,
  index: PropTypes.number,
}

const MemoItem = memo(Item)

export default MemoItem

import { PropTypes } from 'prop-types'
import Button from '/src/components/Button'
import DefaultImage from '/src/assets/images/pic_2.jpg'
import { VscPlayCircle, VscChevronRight } from 'react-icons/vsc'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getQueryParams, truncate } from '/src/services/untils'
import { ROUTES } from '/src/services/untils'

const CardElement = ({ data, index, active }) => {
  const title =
    data.title.userPreferred ||
    data.title.english ||
    data.title.romaji ||
    data.title.native
  const backgroundImage = data.bannerImage || DefaultImage
  const coverImage = data.coverImage.large || data.coverImage.extraLarge
  const name =
    data.title.romaji ||
    data.title.english ||
    data.title.userPreferred ||
    data.title.native
  const id = data.id

  const variants = {
    card: {
      open: { x: 0, opacity: 1 },
      closed: { x: -100, opacity: 0 },
    },
    img: {
      open: { x: 0, opacity: 1 },
      closed: { x: -100, opacity: 0 },
    },
    spotlight: {
      open: { y: 0, opacity: 1 },
      closed: { y: -100, opacity: 0 },
    },
    title: {
      open: { y: 0, opacity: 1 },
      closed: { y: -100, opacity: 0 },
    },
    description: {
      open: { x: 0, opacity: 1 },
      closed: { x: 300, opacity: 0 },
    },
    button: {
      watch: {
        open: { x: 0, opacity: 1 },
        closed: { x: 100, opacity: 0 },
      },
      details: {
        open: { x: 0, opacity: 1 },
        closed: { x: -100, opacity: 0 },
      },
    },
  }

  return (
    <motion.div
      animate={active ? 'open' : 'closed'}
      variants={variants.card}
      className="left-0 top-0 absolute rounded-lg w-full
      aspect-[9/5] md:aspect-[5/2] xl:aspect-[3/1] overflow-x-hidden"
      style={{
        background: `linear-gradient(to right, rgba(1, 1, 1, 0.7) 90%,
          rgba(1, 1, 1, 0.7) 90%, rgba(1, 1, 1, 0.7) 90%), url(${backgroundImage})
          no-repeat center center / cover`,
        zIndex: active ? 3 : 2,
      }}
    >
      <div className="w-full h-full relative">
        <motion.div
          animate={active ? 'open' : 'closed'}
          variants={variants.img}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute overflow-hidden right-0 top-0 h-full w-8/12"
        >
          <div
            className="w-full md:w-6/12 absolute md:translate-x-0 flex justify-center"
            style={{ height: '100%', marginLeft: '40%' }}
          >
            <div className="-mt-[25%] md:-mt-[33%] bg-[#e0f2f1] h-[150%] rotate-[15deg] w-full flex justify-center">
              <div
                className="top-[15%] bg-cover bg-center bg-no-repeat relative w-11/12 -mt-[10%] h-full"
                style={{
                  backgroundImage: `url(${coverImage})`,
                }}
              ></div>
            </div>
          </div>
        </motion.div>
        <div className="h-full p-4">
          <div className="h-full w-6/12 md:w-6/12">
            <div className="h-full w-10/12 flex flex-col justify-between md:justify-end">
              <div className="pt-4 pb-0 md:pt-0 md:pb-4">
                <motion.div
                  animate={active ? 'open' : 'closed'}
                  variants={variants.spotlight}
                  transition={{ delay: 0.7, duration: 0.2 }}
                >
                  <p className="font-bold text-sgreen text-sm my-2 p-0">
                    # {index + 1} SPOTLIGHT
                  </p>
                </motion.div>
                <motion.div
                  animate={active ? 'open' : 'closed'}
                  variants={variants.title}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <h3
                    style={{ fontWeight: 'bolder', fontSize: 'min(25px, 3vw)' }}
                    className="text-[#9fe6cd] pb-5"
                  >
                    {truncate(title, 42)}
                  </h3>
                </motion.div>
              </div>
              <div>
                <motion.div
                  animate={active ? 'open' : 'closed'}
                  variants={variants.description}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <p
                    className="max-h-16 xl:max-h-32 py-1 md:block hidden text-[12px] text-slate-200 overflow-scroll"
                    style={{
                      width: '120%',
                      mask: 'linear-gradient(transparent, white 10%, white 90%, transparent)',
                    }}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></p>
                </motion.div>
                <div className="flex mt-5 mb-2 lg:mb-8 z-[2]">
                  <motion.div
                    animate={active ? 'open' : 'closed'}
                    variants={variants.button.details}
                    transition={{ delay: 0.5 }}
                    style={{
                      zIndex: 4,
                    }}
                  >
                    <Link
                      to={{
                        pathname: ROUTES.DETAILS,
                        search: getQueryParams({ id }),
                      }}
                    >
                      <Button
                        style={{
                          color: '#111827',
                          backgroundColor: '#9fe6cd',
                          paddingLeft: '1rem',
                          paddingRight: '1.25rem',
                        }}
                        hoverStyle={{
                          color: '#111827',
                          backgroundColor: '#e5e7eb',
                        }}
                      >
                        <VscChevronRight className="text-lg mr-1" />
                        <span className="normal-case tracking-wide">
                          View Details
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

CardElement.propTypes = {
  data: PropTypes.any,
  index: PropTypes.number,
  active: PropTypes.bool,
}

export default CardElement

import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { VscPlay, VscAdd, VscClose } from 'react-icons/vsc'
import Button from '/src/components/Button'
import { Link } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import { Context } from '/src/context'
import { ROUTES } from '/src/services/untils'

const Find = ({ data = {}, index = 0, closeButton }) => {
  const title =
    data.title.romaji ||
    data.title.userPreferred ||
    data.title.english ||
    data.title.native

  const [hover, setHover] = useState(false)
  const [user] = useContext(Context)
  const added = user.loggedIn
    ? user.data?.userList?.filter((x) => x.id === data.id)?.length > 0
    : false

  const variants = {
    img: {
      open: { scale: 1.1, x: -10, y: -5, rotate: -10 },
      closed: { scale: 1, x: 0, y: 5, rotate: 0 },
    },
    title: {
      open: { x: -10 },
      closed: { x: 0 },
    },
    bottom: {
      open: { x: 10 },
      closed: { x: 0 },
    },
    button: {
      details: {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: 50 },
      },
      add: {
        open: { x: 5 },
        closed: { x: 0 },
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: index / 10 }}
      className="w-full sm:w-1/2 2xl:w-1/3 p-2"
    >
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setTimeout(() => setHover(false), 2000)}
        className="glass h-[200px] cursor-pointer"
      >
        <div className="flex h-full">
          <div className="h-full aspect-[2/3]">
            <motion.div
              animate={hover ? 'open' : 'closed'}
              variants={variants.img}
            >
              <img
                className="object-cover rounded-md h-full w-full"
                src={data.coverImage.large}
              />
            </motion.div>
          </div>
          <motion.div
            style={{ width: 'calc(100% - 134px)' }}
            className="p-2 flex flex-col justify-between"
          >
            <motion.div
              animate={hover ? 'open' : 'closed'}
              variants={variants.title}
              className="flex justify-end"
            >
              <div className="w-[55px] flex justify-end items-center pr-1">
                <p className="text-gap-1 text-teal-500">Title: </p>
              </div>
              <div
                style={{ width: 'calc(100% - 50px)', maxHeight: 65 }}
                className="overflow-hidden"
              >
                <p className="text-gray-200 text-xs">{title}</p>
              </div>
            </motion.div>
            <motion.div
              animate={hover ? 'open' : 'closed'}
              variants={variants.bottom}
            >
              <div className="flex justify-end mb-2">
                <motion.div
                  animate={hover ? 'open' : 'closed'}
                  variants={variants.button.details}
                  className="pr-5"
                >
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
                        color: hover ? '#111827' : '#cbd5e1',
                        backgroundColor: hover ? '#5eead4ee' : '#000000',
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
                </motion.div>
                <motion.div
                  animate={hover ? 'open' : 'closed'}
                  variants={variants.button.add}
                  className="pr-5"
                >
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
                        color: hover ? '#111827' : '#cbd5e1',
                        backgroundColor: hover ? '#e5e7ebee' : '#11182799',
                      }}
                      hoverStyle={{
                        color: '#111827',
                        backgroundColor: '#e5e7eb',
                      }}
                    >
                      {added ? (
                        <>
                          <VscClose className="mr-1 text-lg" />
                          <span>Remove</span>
                        </>
                      ) : (
                        <>
                          <VscAdd className="mr-2 text-md" />
                          <span>Add</span>
                        </>
                      )}
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <div className="flex justify-start">
                <div className="w-[55px] flex justify-end items-center pr-1">
                  <p className="text-gap-1 text-teal-500">Year: </p>
                </div>
                <div
                  style={{ width: 'calc(100% - 50px)' }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-200 text-xs">
                    {data?.startDate?.year || 'NO DATA'}
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="w-[55px] flex justify-end items-center pr-1">
                  <p className="text-gap-1 text-teal-500">Status: </p>
                </div>
                <div
                  style={{ width: 'calc(100% - 50px)' }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-200 text-xs">
                    {(data?.status?.split('_') || ['NO', 'DATA']).join(' ')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

Find.propTypes = {
  data: PropTypes.any,
  index: PropTypes.number,
  closeButton: PropTypes.any,
}

const MemoFind = memo(Find)

export default MemoFind

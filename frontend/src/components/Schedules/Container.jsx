import { memo } from 'react'
import { PropTypes } from 'prop-types'
import Card from '/src/components/Card'
import { AiOutlineSchedule } from 'react-icons/ai'
import { HiCalendarDays } from 'react-icons/hi2'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Options from './Options'

const scrollState = {
  LEFT: -1,
  MID: 0,
  RIGHT: 1,
}

const Container = ({ list, head, index, setIndex }) => {
  const [scroll, setScroll] = useState(scrollState.MID)
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['#ffe4e622', '#ffe4e628', '#ffe4e622']
  )

  useEffect(() => {
    let interval = null
    let container = document.querySelector('.schedule-container')
    if (container && scroll !== scrollState.MID) {
      interval = setInterval(() => {
        container.scrollLeft += 20 * scroll
      }, 10)
    }
    return () => {
      clearInterval(interval)
    }
  }, [scroll])

  if (!list || list.length == 0) {
    return <></>
  }

  const handleDrag = (_, info) => {
    let offset = info.offset.x
    if (offset > 100) {
      if (scroll !== scrollState.RIGHT) {
        setScroll(scrollState.RIGHT)
      }
    } else if (offset > 10) {
      if (scroll !== scrollState.RIGHT / 2) {
        setScroll(scrollState.RIGHT / 2)
      }
    } else if (offset < -100) {
      if (scroll !== scrollState.LEFT) {
        setScroll(scrollState.LEFT)
      }
    } else if (offset < -10) {
      if (scroll !== scrollState.LEFT / 2) {
        setScroll(scrollState.LEFT / 2)
      }
    } else {
      if (scroll !== scrollState.MID) {
        setScroll(scrollState.MID)
      }
    }
  }

  return (
    <>
      <div className="flex justify-between lg:mx-10 mx-3 mt-5">
        <div className="flex">
          <div className="a-center">
            <AiOutlineSchedule className="text-sgreen text-[22px] mr-2" />
          </div>
          <div className="a-center font-semibold">
            <h1 className="text-slate-200 text-sm side-heading">
              {head} <span className="text-sgreen">schedule</span>
            </h1>
          </div>
        </div>
        <Options index={index} setIndex={setIndex} />
      </div>
      <div className="mt-4 mx-3 lg:mx-10">
        <div className="glass rounded-2xl">
          <div
            className="schedule-container w-full overflow-x-scroll rounded-2xl flex flex-row"
            style={{
              mask: 'linear-gradient(90deg, transparent, white 2%, white 98%, transparent)',
            }}
          >
            <div className="mb-6 sm:mb-0 px-4"></div>
            {list.map((data, index) => (
              <Card type="schedule" key={`sch-${index}`} data={data} />
            ))}
            <div className="relative mb-6 sm:mb-0 py-5">
              <div>
                <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-[5px] bg-sgreen ring-[#f3f4f666] shrink-0">
                  <HiCalendarDays className="text-md" />
                </div>
              </div>
            </div>
            <div className="mb-6 sm:mb-0 px-4"></div>
          </div>
        </div>
      </div>
      <div className="w-full a-center mt-3 mb-8 px-2">
        <motion.div
          className="mx-2 overflow-hidden w-full md:w-[300px] p-2 rounded-lg a-center"
          style={{
            background,
            scrollBehavior: 'revert',
          }}
        >
          <motion.div
            drag="x"
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x }}
            onDrag={handleDrag}
            onDragEnd={() => setScroll(scrollState.MID)}
          >
            <div className="w-8 h-8 p-2 a-center rounded-lg bg-[#f0fdfa66]">
              <div className="h-full w-full rounded-full ring-2 ring-white a-center"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

Container.propTypes = {
  list: PropTypes.any,
  head: PropTypes.string,
  index: PropTypes.number,
  setIndex: PropTypes.any,
}

const MemoContainer = memo(Container)

export default MemoContainer

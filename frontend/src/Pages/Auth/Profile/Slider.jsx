import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Card from '/src/components/Card'

const scrollState = {
  LEFT: -1,
  MID: 0,
  RIGHT: 1,
}

const Slider = ({ list, name }) => {
  const [scroll, setScroll] = useState(scrollState.MID)
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['#ffe4e622', '#ffe4e628', '#ffe4e622']
  )

  useEffect(() => {
    let interval = null
    let container = document.querySelector(`.${name}-container`)
    if (container && scroll !== scrollState.MID) {
      interval = setInterval(() => {
        container.scrollLeft += 20 * scroll
      }, 10)
    }
    return () => {
      clearInterval(interval)
    }
  }, [scroll, name])

  if (!list || list.length === 0) {
    return (
      <div className="h-[250px] a-center">
        <p className="text-gap-2 text-gray-200">Nothing Avaliable</p>
      </div>
    )
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
    <div>
      <div className="mt-4 mx-4">
        <div className="">
          <div
            className={`${name}-container slider-container slider`}
            style={{
              mask: 'linear-gradient(90deg, transparent, white 2%, white 98%, transparent)',
            }}
          >
            <div className="px-2"></div>
            {list.map((data, index) => (
              <Card type="item" key={`item-${index}`} index={index} data={data} />
            ))}
            <div className="px-2"></div>
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
    </div>
  )
}

Slider.propTypes = {
  list: PropTypes.array,
  name: PropTypes.string,
}

const MemoSlider = memo(Slider)

export default MemoSlider

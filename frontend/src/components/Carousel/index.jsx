import { PropTypes } from 'prop-types'
import CardElement from './CardElement'
import { useEffect, useState } from 'react'
import Spinner from '/src/components/Spinner'

const Carousel = ({ list }) => {
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setActiveCard((activeCard + 1) % list.length)
    }, 5000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [activeCard, list])

  if (!list || list.length === 0) {
    return (
      <div className="xl:container mx-auto">
        <div className="lg:m-10 m-3 carousel relative aspect-[9/5] md:aspect-[5/2] xl:aspect-[3/1]">
          <Spinner />
        </div>
      </div>
    )
  }
  return (
    <div className="xl:container mx-auto">
      <div className="lg:m-10 m-3 carousel relative aspect-[9/5] md:aspect-[5/2] xl:aspect-[3/1]">
        {list.map((data, index) => {
          return (
            <CardElement
              key={'ccard-' + index}
              data={data}
              index={index}
              active={index === activeCard}
            />
          )
        })}
        <div className="z-[4] px-1 w-full absolute left-0 h-[2px] bottom-0">
          <div
            className="bg-sgreen rounded-full h-full"
            style={{ width: `${(activeCard + 1) * 10}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  list: PropTypes.array,
}

export default Carousel

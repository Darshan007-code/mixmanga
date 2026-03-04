import { memo } from 'react'
import Lottie from 'react-lottie'
import GirlFlyingAnimation from '/src/assets/animations/girl_flying.json'

const EmptyQuery = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: GirlFlyingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div style={{ height: 'calc(100vh - 150px)' }} className="a-center">
      <div>
        <div className="w-[300px] md:w-[350px] lg:w-[400px] aspect-square">
          <Lottie options={options} />
        </div>
        <div className="a-center text-gray-200">
          <p className="text-gap-1">
            Search <span className="text-sgreen">Any Manga</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const MemoEmptyQuery = memo(EmptyQuery)

export default MemoEmptyQuery

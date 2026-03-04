import { PropTypes } from 'prop-types'
import Lottie from 'react-lottie'
import SpinnerAnimation from '/src/assets/animations/spinner.json'

const Spinner = ({ height = 300 }) => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: SpinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div
      className="w-full a-center"
      style={{
        height: `max(${height}px, 100%)`,
      }}
    >
      <div className="h-[200px]">
        <Lottie style={{ cursor: 'default' }} options={options} />
      </div>
    </div>
  )
}

Spinner.propTypes = {
  height: PropTypes.number,
}

export default Spinner

import { motion } from 'framer-motion'
import { PropTypes } from 'prop-types'
import ReactDOM from 'react-dom'

const Error = ({ error }) => {
  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -500 },
  }
  return ReactDOM.createPortal(
    <motion.div
      animate={error ? 'open' : 'closed'}
      variants={variants}
      className="w-[240px] px-4 h-12 py-2 bg-[#e5e7ebee] rounded-lg"
      style={{
        position: 'fixed',
        zIndex: 15,
        top: 'calc(30vh - 24px)',
        left: 'calc(50vw - 120px)',
      }}
    >
      <p className="text-red-800 text-center text-gap-2 text-xs h-4">{error}</p>
    </motion.div>,
    document.body
  )
}

Error.propTypes = {
  error: PropTypes.string,
}

export default Error

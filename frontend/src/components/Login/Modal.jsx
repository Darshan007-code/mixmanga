import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import Container from './Container'

const Modal = ({ close }) => {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        top: 'calc(50vh - 165px)',
        left: 'calc(50vw - 165px)',
      }}
    >
      <Container modal={true} close={close} />
    </motion.div>
  )
}

Modal.propTypes = {
  close: PropTypes.any,
}

export default Modal

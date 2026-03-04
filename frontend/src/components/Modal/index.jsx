import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import Button from '/src/components/Button'
import { VscClose } from 'react-icons/vsc'
import Logo from '/src/components/Logo'

const Modal = ({ children, close, closeModal, style }) => {
  if (close) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed z-[4] left-0 top-0 a-center h-screen w-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        className="glass"
        style={style || {}}
      >
        <div className="h-[60px] flex justify-between p-5 pt-8">
          <Logo />
          <div className="a-center -mt-1">
            <Button btnType="icon" onClick={closeModal}>
              <VscClose className="text-xl" />
            </Button>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </motion.div>
    </div>,
    document.body
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  close: PropTypes.bool,
  submitCallback: PropTypes.any,
  closeModal: PropTypes.any,
  style: PropTypes.any,
}

export default Modal

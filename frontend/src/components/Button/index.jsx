import { PropTypes } from 'prop-types'
import { LuSearch } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Button = ({
  btnType = 'default',
  children,
  style = {},
  hoverStyle = {},
  ...props
}) => {
  const [hover, setHover] = useState(false)
  const buttons = {
    find: (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button
          {...props}
          className="flex ring-2 bg-gray-900 ring-teal-900 p-1 px-2 rounded-lg cursor-pointer"
        >
          <div className="a-center animate-pulse">
            <LuSearch className="text-slate-200" />
          </div>
          <div className="a-center">
            <span className="px-1 font-semibold uppercase text-slate-200 text-xs">
              find
            </span>
          </div>
        </button>
      </motion.div>
    ),
    icon: (
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
        <button
          type="button"
          {...props}
          className="inline-flex items-center p-1 bg-transparent ring-2 ring-gray-400
          rounded-md font-semibold text-xs text-gray-300 uppercase tracking-widest shadow-sm
          hover:text-slate-200"
        >
          {children}
        </button>
      </motion.div>
    ),
    auth: (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button
          type="button"
          {...props}
          style={style}
          className="inline-flex items-center px-4 py-2 bg-transparent ring-2 ring-gray-800
          rounded-md font-semibold text-xs text-gray-300 uppercase tracking-widest shadow-sm
          transition ease-in-out duration-150
          hover:bg-sgreen hover:text-slate-800
          focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-gray-800
          disabled:opacity-25"
        >
          {children}
        </button>
      </motion.div>
    ),
    default: (
      <motion.div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTapStart={() => setHover(true)}
        onTapEnd={() => setHover(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="button"
          {...props}
          style={{
            ...style,
            ...(hover ? hoverStyle : {}),
          }}
          className="inline-flex items-center px-4 py-2 bg-transparent ring-2 ring-[#11182733]
          rounded-md font-semibold text-xs text-gray-300 uppercase tracking-widest shadow-sm
          transition ease-in-out duration-150
          hover:bg-sgreen hover:text-slate-800
          disabled:opacity-25"
        >
          {children}
        </button>
      </motion.div>
    ),
  }
  return buttons[btnType]
}

Button.propTypes = {
  children: PropTypes.node,
  btnType: PropTypes.string,
  style: PropTypes.any,
  hoverStyle: PropTypes.any,
}

export default Button

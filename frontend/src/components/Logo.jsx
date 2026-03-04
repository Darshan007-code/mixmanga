import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTES } from '/src/services/untils'

const Logo = ({ className = "text-2xl" }) => {
  return (
    <Link to={ROUTES.HOME}>
      <div className="hover-effect a-center cursor-pointer select-none">
        <h1 className={`${className} font-black tracking-tighter flex items-center`}>
          <span className="text-slate-200">MIX</span>
          <span className="text-sgreen ml-0.5">MANGA</span>
        </h1>
      </div>
    </Link>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
}

export default Logo

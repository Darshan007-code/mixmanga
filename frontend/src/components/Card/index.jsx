import { PropTypes } from 'prop-types'
import Find from './Find'
import Recent from './Recent'
import Season from './Season'
import Schedule from './Schedule'
import Item from './Item'

const Card = ({ type, data = {}, index = 0, closeButton }) => {
  switch (type) {
    case 'find':
      return <Find data={data} index={index} closeButton={closeButton} />
    case 'recent':
      return <Recent data={data} />
    case 'season':
      return <Season data={data} index={index} />
    case 'schedule':
      return <Schedule data={data} />
    case 'item':
      return <Item data={data} />
    default:
      return <></>
  }
}

Card.propTypes = {
  type: PropTypes.string,
  data: PropTypes.any,
  index: PropTypes.number,
  closeButton: PropTypes.any,
}

export default Card

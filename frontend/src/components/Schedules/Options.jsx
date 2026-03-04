import { PropTypes } from 'prop-types'
import Button from '/src/components/Button'
import { HiOutlineChevronUpDown } from 'react-icons/hi2'
import { useState } from 'react'

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const Options = ({ index, setIndex }) => {
  const options = ['Yesterday', 'Today', 'Tomorrow', 2, 3, 4, 5].map((x) => {
    if (typeof x === 'number') {
      const current = new Date()
      current.setDate(current.getDate() + x)
      return weekday[current.getDay()]
    }
    return x
  })
  const [show, setShow] = useState(false)

  const handleSelect = (index) => {
    setIndex(index)
    setShow(false)
  }

  return (
    <div className="relative mx-3">
      <Button
        style={{
          height: 30,
          color: '#cbd5e1',
          backgroundColor: '#11182799',
        }}
        hoverStyle={{
          color: '#111827',
          backgroundColor: '#e5e7ebee',
        }}
        onClick={() => setShow(!show)}
      >
        <div className="flex">
          <div className="a-center mr-2">
            <span className="w-max">{options[index]}</span>
          </div>
          <div className="a-center">
            <HiOutlineChevronUpDown className="text-xl" />
          </div>
        </div>
      </Button>
      {show && (
        <div className="absolute z-[3] right-0 top-full pt-2">
          <div className="py-3 rounded-lg text-gray-900 bg-[#e5e7ebdd] flex flex-col">
            {options.map((x, index) => (
              <div
                key={'option-' + index}
                onClick={() => handleSelect(index)}
                className="cursor-pointer py-2 px-5 text-sm hover:bg-[#111827dd] hover:text-gray-200 w-[150px]"
              >
                {x}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

Options.propTypes = {
  index: PropTypes.number,
  setIndex: PropTypes.any,
}

export default Options

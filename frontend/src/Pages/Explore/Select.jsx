import { PropTypes } from 'prop-types'
import { HiOutlineChevronUpDown } from 'react-icons/hi2'

const Select = ({ id, label, options, item, setItem }) => {
  return (
    <div>
      <div className="flex justify-center">
        <label
          className="w-full text-center text-white glass glass-hard text-sm cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <div
        className="select relative mt-2"
        style={{
          width: 'min(100%, 300px)',
        }}
      >
        <select
          id={id}
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="
          block appearance-none py-2 px-4 pr-8 rounded leading-tight w-full
          text-gray-300 bg-[#11182777] focus:bg-[#11182755]
          focus:outline-none font-semibold text-xs tracking-wider h-[35px]"
        >
          {options &&
            options.map((x, index) => (
              <option
                key={`option-${index}`}
                className="font-semibold text-xs tracking-wider bg-gray-100 text-gray-800"
              >
                {x.name}
              </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
          <HiOutlineChevronUpDown className="text-xl" />
        </div>
      </div>
    </div>
  )
}

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.any,
  item: PropTypes.string,
  setItem: PropTypes.any,
}

export default Select

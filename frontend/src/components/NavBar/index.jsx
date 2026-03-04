import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { VscMenu } from 'react-icons/vsc'
import { LuNewspaper } from 'react-icons/lu'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { TbDatabaseSearch } from 'react-icons/tb'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import { ROUTES } from '/src/services/untils'

const NavBar = () => {
  const scale = {
    hover: 1.1,
    tap: 0.95,
  }
  const [yShift, setYShift] = useState(0)

  const toggleYShift = () => {
    setYShift(yShift === 0 ? 60 : 0)
  }

  useEffect(() => {
    const inteval = setTimeout(() => {
      setYShift(60)
    }, 3000)
    return () => {
      clearInterval(inteval)
    }
  }, [])

  return (
    <motion.div
      className="fixed z-[5]"
      style={{
        bottom: 10,
        left: 'calc(50vw - 150px)',
      }}
      animate={{
        y: yShift,
      }}
    >
      <div className="relative w-[300px] h-[50px] p-2 rounded-lg bg-[#f3f4f6dd]">
        <div
          className="rounded-t-full bg-[#f3f4f6dd] w-16 h-8 -mt-10 mx-auto a-center cursor-pointer"
          onClick={toggleYShift}
        >
          <VscMenu className="text-gray-950 text-xl mt-2" />
        </div>
        <div className="flex justify-around h-[50px] p-2">
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: scale.hover,
            }}
            whileTap={{
              scale: scale.tap,
            }}
          >
            <Link
              to={{
                pathname: ROUTES.RECENT,
                search: getQueryParams({ page: 1 }),
              }}
            >
              <LuNewspaper className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: scale.hover,
            }}
            whileTap={{
              scale: scale.tap,
            }}
          >
            <Link
              to={{
                pathname: ROUTES.TRENDING,
                search: getQueryParams({ page: 1 }),
              }}
            >
              <TbBrandGoogleAnalytics className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: scale.hover,
            }}
            whileTap={{
              scale: scale.tap,
            }}
          >
            <Link
              to={{
                pathname: ROUTES.EXPLORE,
                search: getQueryParams({ page: 1 }),
              }}
            >
              <TbDatabaseSearch className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: scale.hover,
            }}
            whileTap={{
              scale: scale.tap,
            }}
          >
            <Link
              to={{
                pathname: ROUTES.PROFILE,
              }}
            >
              <PiUserCircleDuotone className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NavBar

import { memo } from 'react'
import { PropTypes } from 'prop-types'
import { VscDebugLineByLine, VscFlame, VscStarFull, VscRocket, VscWarning } from 'react-icons/vsc'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import Button from '/src/components/Button'
import Card from '/src/components/Card'
import Spinner from '/src/components/Spinner'
import { Link } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import { ROUTES } from '/src/services/untils'

const Trending = ({ list = [], title = "TRENDING" }) => {
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case 'most popular':
        return <VscStarFull className="text-sgreen text-[22px] mr-2" />
      case 'top manhwa':
        return <VscRocket className="text-sgreen text-[22px] mr-2" />
      case '18+ adult content':
        return <VscWarning className="text-red-500 text-[22px] mr-2" />
      default:
        return <TbBrandGoogleAnalytics className="text-sgreen text-[22px] mr-2" />
    }
  }

  if (!list || list.length === 0) {
    return (
      <div className="xl:container mx-auto">
        <div className="lg:m-10 m-3 h-[500px]">
          <Spinner />
        </div>
      </div>
    )
  }
  return (
    <div className="xl:container mx-auto">
      <div className="lg:m-10 m-3">
        <div className="flex justify-between">
          <div className="flex">
            <div className="a-center">
              {getIcon()}
            </div>
            <div className="a-center font-semibold">
              <h1 className="text-slate-200 text-sm side-heading">
                Top <span className="text-sgreen uppercase">{title}</span>
              </h1>
            </div>
          </div>
          <Link
            to={{
              pathname: ROUTES.TRENDING,
              search: getQueryParams({ page: 1 }),
            }}
          >
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
            >
              <div className="flex justify-center">
                <div className="a-center">
                  <span className="mr-1 text-xs inline-flex">More</span>
                </div>
                <div className="a-center">
                  <VscDebugLineByLine className="text-[17px]" />
                </div>
              </div>
            </Button>
          </Link>
        </div>
        <div className="season-container mt-3 w-full flex flex-wrap relative">
          {list.map((data, index) => {
            return (
              <Card
                type="season"
                key={'scard-' + index}
                index={index}
                data={data}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

Trending.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
}

const MemoTrending = memo(Trending)

export default MemoTrending

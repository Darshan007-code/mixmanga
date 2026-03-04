import { PropTypes } from 'prop-types'
import { getQueryParams, dateToString } from '/src/services/untils'
import Button from '/src/components/Button'
import { Link } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import Chapters from './Chapters'
import { ROUTES, getAiredUpTo } from '/src/services/untils'

const Info = ({ data, setChapter }) => {
  const totalChapters = data?.chapters || '?'
  const totalVolumes = data?.volumes || '?'
  const currentChapter = getAiredUpTo(
    data.id,
    data?.nextAiringEpisode?.episode
      ? data?.nextAiringEpisode?.episode - 1
      : data?.episodes || 1
  )

  return (
    <div className="m-5 lg:m-8 block md:flex">
      <div className="w-full md:w-4/12 lg:w-3/12 mt-4">
        <div className="mx-1">
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Format :</span>
            <span className="mx-2">{data.format}</span>
          </p>
          <hr className="text-slate-200 mb-3" />
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">English Title :</span>
            <span className="mx-2">{data.title?.english}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Romaji Title :</span>
            <span className="mx-2">{data.title?.romaji}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">User Prefered Title :</span>
            <span className="mx-2">{data.title?.userPreferred}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Native Title :</span>
            <span className="mx-2">{data.title?.native}</span>
          </p>
          <hr className="mb-3 text-slate-200" />
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Started On :</span>
            <span className="mx-2">
              {dateToString(
                data.startDate?.year,
                data.startDate?.month,
                data.startDate?.day
              )}
            </span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Season :</span>
            <span className="mx-2">{data.season}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Type :</span>
            <span className="mx-2">{data.type}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Status :</span>
            <span className="mx-2">{data.status.split('_').join(' ')}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Total Chapters :</span>
            <span className="mx-2">{totalChapters}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Total Volumes :</span>
            <span className="mx-2">{totalVolumes}</span>
          </p>
          <hr className="text-slate-200 mb-3" />
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Genres :</span>
            <span className="mx-2">{data.genres?.join(', ')}</span>
          </p>
          <hr className="text-slate-200 mb-3" />
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Average Score :</span>
            <span className="mx-2">{data.averageScore}</span>
          </p>
          <p className="text-slate-200 p-0 mb-3 text-xs">
            <span className="text-sgreen">Favourites :</span>
            <span className="mx-2">{data.favourites}</span>
          </p>
          <div className="mt-2 mb-1 flex justify-end">
            <Link
              to={{
                pathname: ROUTES.DETAILS,
                search: getQueryParams({ id: data.id }),
              }}
            >
              <Button
                style={{
                  color: '#111827',
                  backgroundColor: '#cbd5e1cc',
                }}
                hoverStyle={{
                  color: '#111827',
                  backgroundColor: '#9fe6cdee',
                }}
              >
                <div className="flex justify-center">
                  <div className="mr-1 -ml-1 a-center">
                    <TbListDetails className="text-lg" />
                  </div>
                  <div className="a-center">
                    <span className="text-xs inline-flex">Details</span>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="vr mx-1 hidden md:inline-flex"></div>
      <div className="w-full md:w-8/12 lg:w-9/12 mt-2 mx-2">
        <Chapters 
          mangaTitle={data.title.romaji || data.title.english || data.title.userPreferred} 
          setChapter={setChapter} 
        />
      </div>
    </div>
  )
}

Info.propTypes = {
  data: PropTypes.any,
  setChapter: PropTypes.any,
}

export default Info

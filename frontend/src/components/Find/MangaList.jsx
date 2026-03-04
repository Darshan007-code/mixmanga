import { memo } from 'react'
import { PropTypes } from 'prop-types'
import NotFoundAnimation from '/src/assets/animations/not_found.json'
import LoadingAnimation from '/src/assets/animations/spinner.json'
import BookFindAnimation from '/src/assets/animations/book_find.json'
import Card from '/src/components/Card'
import Lottie from 'react-lottie'

const MangaList = ({ list, loading, closeButton }) => {
  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const notFoundOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const bookFindOptions = {
    loop: true,
    autoplay: true,
    animationData: BookFindAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="lg:flex justify-between">
      <div className="w-full lg:w-1/3 a-center">
        <div className="hidden lg:block w-[250px] md:w-[300px] lg:w-[350px] aspect-square">
          <Lottie style={{ cursor: 'default' }} options={bookFindOptions} />
        </div>
      </div>
      <div className="w-full lg:w-2/3 flex flex-wrap">
        {loading ? (
          <div
            style={{ height: 'calc(100vh - 150px)' }}
            className="w-full a-center"
          >
            <div>
              <div className="w-[250px] md:w-[300px] lg:w-[350px] aspect-square">
                <Lottie
                  style={{ cursor: 'default' }}
                  options={loadingOptions}
                />
              </div>
              <div className="a-center text-gray-200">
                <p className="text-gap-1">
                  Finding <span className="text-sgreen">Manga</span>
                </p>
              </div>
            </div>
          </div>
        ) : list && list.length !== 0 ? (
          list.map((data, index) => (
            <Card
              type="find"
              key={'find-card-' + index}
              data={data}
              index={index + 1}
              closeButton={closeButton}
            />
          ))
        ) : (
          <div
            style={{ height: 'calc(100vh - 150px)' }}
            className="w-full a-center"
          >
            <div>
              <div className="w-[200px] md:w-[250px] lg:w-[300px] aspect-square">
                <Lottie
                  speed={0.5}
                  style={{ cursor: 'default' }}
                  options={notFoundOptions}
                />
              </div>
              <div className="a-center text-gray-200">
                <p className="text-gap-1">
                  Didn&#39;t found{' '}
                  <span className="text-sgreen">Any related</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

MangaList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  closeButton: PropTypes.any,
}

const MemoMangaList = memo(MangaList)

export default MemoMangaList

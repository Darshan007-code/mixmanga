import { PropTypes } from 'prop-types'
import Spinner from '/src/components/Spinner'
import { memo } from 'react'
import girl from '/src/assets/images/girl.png'
import PageButtons from '/src/components/PageButtons'

const Reader = ({ data, chapter, prevChapter, nextChapter }) => {
  if (!data) {
    return (
      <div className="xl:container mx-auto">
        <div className="lg:m-10 m-3 h-[500px]">
          <Spinner />
        </div>
      </div>
    )
  }

  // data.images should be an array of image URLs
  const images = data.images || []

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-[800px] lg:w-[900px] bg-black/20 min-h-screen">
        {images.length > 0 ? (
          <div className="flex flex-col">
            {images.map((img, index) => (
              <img
                key={`page-${index}`}
                src={img}
                alt={`Page ${index + 1}`}
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ))}
            
            {/* End of Chapter Controls */}
            <div className="py-20 px-5 text-center bg-gradient-to-b from-transparent to-gray-950">
              <h3 className="text-sgreen font-black text-2xl mb-8 uppercase tracking-tighter">
                End of Chapter {chapter}
              </h3>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={prevChapter}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-bold transition-all border border-white/10"
                >
                  Previous
                </button>
                <button 
                  onClick={nextChapter}
                  className="px-12 py-4 bg-sgreen hover:bg-teal-300 rounded-2xl text-slate-900 font-black transition-all shadow-xl shadow-sgreen/20"
                >
                  Next Chapter
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[70vh] a-center flex-col p-10 text-center">
            <div className="w-20 h-20 border-4 border-sgreen/20 border-t-sgreen rounded-full animate-spin mb-6"></div>
            <p className="text-slate-200 text-lg font-bold">
              Fetching Chapter {chapter} Images...
            </p>
            <p className="text-slate-500 text-sm mt-2 max-w-xs">
              If this takes too long, the source might be down. 
              Try refreshing or checking another chapter.
            </p>
            <div className="mt-10 flex gap-4">
               <button onClick={prevChapter} className="text-slate-400 text-xs underline">Prev</button>
               <button onClick={nextChapter} className="text-slate-400 text-xs underline">Next</button>
            </div>
          </div>
        )}
      </div>
      
      <div className="fixed bottom-8 right-8 z-[10] hidden md:block">
        <PageButtons current={chapter} prev={prevChapter} next={nextChapter} />
      </div>
    </div>
  )
}

Reader.propTypes = {
  data: PropTypes.any,
  chapter: PropTypes.number,
  prevChapter: PropTypes.any,
  nextChapter: PropTypes.any,
}

const PureReader = memo(Reader)

export default PureReader

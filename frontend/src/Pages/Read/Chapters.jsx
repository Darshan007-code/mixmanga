import { PropTypes } from 'prop-types'
import { memo, useEffect, useState } from 'react'
import provider from '/src/services/scraper'
import Spinner from '/src/components/Spinner'

const Chapters = ({ mangaTitle, setChapter }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    provider.getChapterList(mangaTitle).then(data => {
      setList(data)
      setLoading(false)
    })
  }, [mangaTitle])

  if (loading) {
    return (
      <div className="h-[200px] a-center">
        <div className="w-10 h-10 border-4 border-sgreen/20 border-t-sgreen rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs uppercase text-sgreen font-black tracking-[0.2em]">
          Available Chapters
        </div>
        <div className="text-[10px] text-slate-500 uppercase font-bold bg-white/5 px-3 py-1 rounded-full">
          {list.length} Chapters Found
        </div>
      </div>
      
      <div
        className="h-[400px] overflow-y-scroll pr-2 custom-scrollbar"
        style={{
          mask: 'linear-gradient(transparent, white 5%, white 95%, transparent)',
        }}
      >
        {list.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {list.map((item, index) => (
              <div
                key={`chapter-${item.id}`}
                className="group cursor-pointer"
                onClick={() => setChapter(item.chapterNum)}
              >
                <div className="bg-white/5 hover:bg-sgreen transition-all duration-300 p-3 rounded-xl border border-white/5 group-hover:border-sgreen/50">
                  <p className="text-[10px] text-sgreen group-hover:text-slate-900 font-black uppercase mb-1">
                    Ch. {item.chapterNum}
                  </p>
                  <p className="text-xs text-slate-300 group-hover:text-slate-900 font-medium truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[200px] a-center flex-col text-center">
            <p className="text-slate-400 text-sm">No English chapters found by the provider.</p>
            <p className="text-slate-600 text-xs mt-2 italic">The manga might not be available on this specific source.</p>
          </div>
        )}
      </div>
    </div>
  )
}

Chapters.propTypes = {
  mangaTitle: PropTypes.string.isRequired,
  setChapter: PropTypes.any.isRequired,
}

const PureChapters = memo(Chapters)

export default PureChapters

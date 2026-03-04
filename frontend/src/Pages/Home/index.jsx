import { useEffect, useState } from 'react'
import MainLayout from '/src/layouts/MainLayout'
import Anilist from '/src/services/anilist'
import Carousel from '/src/components/Carousel'
import Recents from '/src/components/Recents'
import Trending from '/src/components/Trending'
import Button from '/src/components/Button'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

const variables = {
  home: {
    carouselPage: 1,
    carouselPerPage: 10,
    recentPage: 1,
    recentPerPage: 48,
    trendingPage: 1,
    trendingPerPage: 12,
    popularPage: 1,
    popularPerPage: 12,
    manhwaPage: 1,
    manhwaPerPage: 12,
    adultPage: 1,
    adultPerPage: 12,
  },
}

const Home = () => {
  const [data, setData] = useState({
    carousel: null,
    recent: null,
    trending: null,
    popular: null,
    manhwa: null,
    adult: null,
  })
  const [showAdult, setShowAdult] = useState(false)

  useEffect(() => {
    Anilist('home', variables.home, (result) => {
      setData(result)
    })
  }, [])

  return (
    <MainLayout>
      <Carousel list={data.carousel} />
      <div className="h-8"></div>
      <Recents list={data.recent} />
      <div className="h-8"></div>
      <Trending list={data.trending} />
      <div className="h-8"></div>
      <Trending list={data.popular} title="Most Popular" />
      <div className="h-8"></div>
      <Trending list={data.manhwa} title="Top Manhwa" />
      
      <div className="h-12 border-t border-white/5 mt-16 mx-10 flex flex-col items-center justify-center">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-4 font-bold">Safe Content Filter Active</p>
        <Button 
          onClick={() => setShowAdult(!showAdult)}
          style={{
            background: showAdult ? '#f87171' : 'rgba(255,255,255,0.05)',
            color: showAdult ? '#111827' : '#94a3b8',
            border: showAdult ? 'none' : '1px solid rgba(255,255,255,0.1)',
            padding: '10px 24px',
            borderRadius: '12px'
          }}
        >
          <div className="flex items-center gap-2">
            {showAdult ? <VscEyeClosed className="text-lg" /> : <VscEye className="text-lg" />}
            <span className="text-xs font-black uppercase tracking-widest">
              {showAdult ? 'Hide 18+ Content' : 'Show 18+ Content'}
            </span>
          </div>
        </Button>
      </div>

      {showAdult && (
        <>
          <div className="h-8"></div>
          <Trending list={data.adult} title="18+ Adult Content" />
        </>
      )}
      <div className="h-[150px]"></div>
    </MainLayout>
  )
}

export default Home

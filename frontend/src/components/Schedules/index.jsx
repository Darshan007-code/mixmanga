import { useEffect, useState } from 'react'
import Anilist from '/src/services/anilist'
import Container from './Container'
import Spinner from '/src/components/Spinner'

const Schedules = () => {
  const shift = -1
  const [list, setList] = useState(null)
  const [head, setHead] = useState(null)
  const [index, setIndex] = useState(1)

  const variables = {
    page: 1,
    perPage: 50,
  }

  const getSchedule = () => {
    setList(null)
    const current = new Date()
    current.setDate(current.getDate() + index + shift)

    setHead(current.toString().slice(0, 15))

    const today = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate()
    )
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const airingAtGreater = Math.floor(today.getTime() / 1000) - 1
    const airingAtLesser = Math.floor(tomorrow.getTime() / 1000)

    Anilist(
      'schedule',
      {
        ...variables,
        airingAtGreater,
        airingAtLesser,
      },
      (data) => {
        data = data.filter(
          (x) =>
            x.media.countryOfOrigin != 'CN' &&
            !x.media.genres?.includes('Hentai')
        )
        setList(data)
      }
    )
  }

  useEffect(() => {
    getSchedule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  if (list === null) {
    return (
      <div className="xl:container mx-auto">
        <div className="lg:m-10 m-3 h-[300px]">
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <div className="xl:container mx-auto">
      <Container head={head} list={list} index={index} setIndex={setIndex} />
    </div>
  )
}

export default Schedules

import MainLayout from '/src/layouts/MainLayout'
import { useLocation } from 'react-router-dom'
import Anilist from '/src/services/anilist'
import { useEffect, useState } from 'react'
import Spinner from '/src/components/Spinner'
import Container from './Container'

const Read = () => {
  const [data, setData] = useState(null)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const id = query.get('id')

  useEffect(() => {
    Anilist('read', { id }, (data) => {
      setData(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) {
    return (
      <MainLayout>
        <div className="xl:container mx-auto">
          <div className="lg:m-10 m-3 h-screen">
            <Spinner />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container data={data} />
    </MainLayout>
  )
}

export default Read

import { useEffect, useState } from 'react'
import Anilist from '/src/services/anilist'
import Container from './Container'
import { useNavigate, useLocation } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import MainLayout from '/src/layouts/MainLayout'
import Spinner from '/src/components/Spinner'
import { ROUTES } from '/src/services/untils'

const Details = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const [id, setId] = useState(query.get('id'))
  const [data, setData] = useState(null)

  useEffect(() => {
    const new_id = query.get('id')
    Anilist('details', { id: new_id }, (data) => {
      setData(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, location])

  const onMedia = ({ id }) => {
    navigate(ROUTES.DETAILS + getQueryParams({ id }))
    query.set('id', id)
    setData(null)
    setId(id)
  }

  if (!id) {
    return (
      <MainLayout>
        <div className="xl:container mx-auto">
          <div className="lg:m-10 m-3 h-screen a-center">
            <p className="text-gray-200">Invalid Route</p>
          </div>
        </div>
      </MainLayout>
    )
  }

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

  return <Container data={data} onMedia={onMedia} />
}

export default Details

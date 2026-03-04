import { useEffect, useState } from 'react'
import MainLayout from '/src/layouts/MainLayout'
import Anilist from '/src/services/anilist'
import Spinner from '/src/components/Spinner'
import { LuNewspaper } from 'react-icons/lu'
import Card from '/src/components/Card'
import { useNavigate, useLocation } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import PageButtons from '/src/components/PageButtons'
import { ROUTES } from '/src/services/untils'

const Recent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const [list, setList] = useState(null)
  const [variables, setVariables] = useState({
    page: Math.max(query.get('page'), 1) || 1,
    perPage: 24,
  })

  const setPage = (value, flag = true) => {
    if (value < 1) {
      return
    }
    setList(null)
    if (flag) {
      navigate(ROUTES.RECENT + getQueryParams({ page: value }))
      query.set('page', value)
    }
    setVariables({ ...variables, page: value })
  }

  useEffect(() => {
    Anilist('recent', variables, (data) => {
      setList(data)
    })
  }, [variables, navigate])

  useEffect(() => {
    const handleKeyBinding = (event) => {
      if (event.shiftKey) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            setPage(variables.page - 1)
            break
          case 'ArrowRight':
            event.preventDefault()
            setPage(variables.page + 1)
            break
        }
      }
    }
    addEventListener('keydown', handleKeyBinding)
    return () => {
      removeEventListener('keydown', handleKeyBinding)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPage])

  useEffect(() => {
    const page = Math.max(query.get('page'), 1) || 1
    setPage(page, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  if (!list || list.length === 0) {
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
      <div className="p-4 xl:container mx-auto">
        <div className="h-8"></div>
        <div className="md:flex justify-between px-4 mb-4">
          <div className="flex">
            <div className="a-center">
              <LuNewspaper className="text-sgreen text-[22px] mr-2" />
            </div>
            <div className="a-center font-semibold">
              <h1 className="text-slate-200 text-sm side-heading">
                Latest <span className="text-sgreen">Updates</span>
              </h1>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <PageButtons
              current={variables.page}
              prev={() => setPage(variables.page - 1)}
              next={() => setPage(variables.page + 1)}
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          {list.map((data, index) => {
            return (
              <Card
                type="recent"
                index={index}
                key={'rcard-' + index}
                data={data}
              />
            )
          })}
        </div>
        <div className="mt-8">
          <PageButtons
            current={variables.page}
            prev={() => setPage(variables.page - 1)}
            next={() => setPage(variables.page + 1)}
          />
        </div>
        <div className="h-[150px]"></div>
      </div>
    </MainLayout>
  )
}

export default Recent

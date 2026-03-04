import { useEffect, useState } from 'react'
import Filter from './Filter'
import MainLayout from '/src/layouts/MainLayout'
import Anilist from '/src/services/anilist'
import Spinner from '/src/components/Spinner'
import { useNavigate, useLocation } from 'react-router-dom'
import { getQueryParams } from '/src/services/untils'
import Container from './Container'
import Modal from '/src/components/Modal'
import { ROUTES } from '/src/services/untils'

const defaultFilter = () => {
  return {
    manganame: '',
    country: '',
    format: '',
    year: '',
    sort: '',
    status: '',
    averageScore: -1,
    genres: {},
  }
}

const getVariables = (variables) => {
  let {
    manganame,
    countryOfOrigin,
    format,
    genre,
    year,
    sort,
    status,
    averageScore,
  } = variables

  if (!manganame || manganame.trim() == '') {
    manganame = null
  }
  if (!['JP', 'CN', 'KR'].includes(countryOfOrigin)) {
    countryOfOrigin = null
  }
  if (!['MANGA', 'ONE_SHOT', 'NOVEL'].includes(format)) {
    format = null
  }
  genre = []
  for (let [k, v] of Object.entries(variables.genres)) {
    if (v) {
      genre.push(k)
    }
  }
  year = parseInt(year)
  const nextYear = new Date().getFullYear() + 1
  if (isNaN(year) || 1940 > year || year > nextYear) {
    year = null
  }
  if (
    ![
      'TITLE_ENGLISH',
      'TITLE_ENGLISH_DESC',
      'START_DATE_DESC',
      'POPULARITY',
      'POPULARITY_DESC',
    ].includes(sort)
  ) {
    sort = null
  }
  if (
    ![
      'RELEASING',
      'FINISHED',
      'NOT_YET_RELEASED',
      'CANCELLED',
      'HIATUS',
    ].includes(status)
  ) {
    status = null
  }
  averageScore = parseInt(averageScore)
  if (isNaN(averageScore)) {
    averageScore = null
  }
  const build = {
    search: manganame,
    countryOfOrigin,
    format,
    genre_in: genre,
    seasonYear: year,
    sort,
    status,
    averageScore_greater: averageScore,
  }
  return build
}

const Explore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showFilter, setShowFilter] = useState(false)
  const query = new URLSearchParams(location.search)
  const [list, setList] = useState(null)
  const [variables, setVariables] = useState({
    page: Math.max(query.get('page'), 1) || 1,
    perPage: 24,
  })
  const [filter, setFilter] = useState(defaultFilter())

  const setPage = (value, flag = true) => {
    if (value < 1) {
      return
    }
    setList(null)
    if (flag) {
      navigate(ROUTES.EXPLORE + getQueryParams({ page: value }))
      query.set('page', value)
    }
    setVariables({ ...variables, page: value })
  }

  useEffect(() => {
    const build = { ...variables, build: getVariables(filter) }
    setList(null)
    Anilist('search', build, (data) => {
      setList(data)
    })
  }, [filter, variables])

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
          case '?':
            if (!showFilter) {
              event.preventDefault()
              setShowFilter(true)
            }
            break
        }
      } else {
        switch (event.key) {
          case 'Escape':
            setShowFilter(false)
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

  if (!list) {
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
      {showFilter && (
        <Modal
          close={!showFilter}
          closeModal={() => setShowFilter(false)}
          style={{
            background: '#042f2e44',
            border: '2px solid #f1f5f944',
          }}
        >
          <Filter
            defaultFilter={defaultFilter}
            close={() => setShowFilter(false)}
            filter={filter}
            setFilter={setFilter}
          />
        </Modal>
      )}
      <div
        style={{
          filter: showFilter ? 'blur(10px)' : 'blur(0)',
          opacity: showFilter ? 0.2 : 1,
        }}
      >
        <Container
          page={variables.page}
          setPage={setPage}
          list={list}
          setShow={setShowFilter}
        />
      </div>
    </MainLayout>
  )
}

export default Explore

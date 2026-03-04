import { useState, useContext, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { VscSignIn, VscSignOut } from 'react-icons/vsc'
import Auth from '/src/components/Auth'
import Logo from '/src/components/Logo'
import Button from '/src/components/Button'
import wall from '/src/assets/images/pic_1.jpg'
import Find from '/src/components/Find'
import FindManga from '/src/components/FindManga'
import Footer from '/src/components/Footer'
import NavBar from '/src/components/NavBar'
import Login from '/src/components/Login/Modal'
import { Context } from '/src/context'
import { useNavigate, useLocation } from 'react-router'
import { ROUTES, getQueryParams } from '/src/services/untils'

const MainLayout = ({ children }) => {
  const [user, setUser] = useContext(Context)
  const [findModal, setFindModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const modalOpened = () => {
    return findModal || loginModal
  }

  useEffect(() => {
    const handleKeyBinding = (event) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case 'l':
            event.preventDefault()
            setLoginModal(true)
            break
        }
      } else if (event.shiftKey) {
        switch (event.key) {
          case 'D':
            if (!modalOpened()) {
              if (location.pathname === ROUTES.READ) {
                navigate(
                  ROUTES.DETAILS + getQueryParams({ id: query.get('id') })
                )
              } else if (location.pathname !== ROUTES.HOME) {
                navigate(ROUTES.HOME)
              }
            }
            break
          case 'E':
            if (!modalOpened() && location.pathname !== ROUTES.EXPLORE) {
              navigate(ROUTES.EXPLORE + getQueryParams({ page: 1 }))
            }
            break
          case 'F':
            if (!modalOpened() && location.pathname !== ROUTES.PROFILE) {
              navigate(ROUTES.PROFILE)
            }
            break
          case 'R':
            if (!modalOpened() && location.pathname !== ROUTES.RECENT) {
              navigate(ROUTES.RECENT + getQueryParams({ page: 1 }))
            }
            break
          case 'T':
            if (!modalOpened() && location.pathname !== ROUTES.TRENDING) {
              navigate(ROUTES.TRENDING + getQueryParams({ page: 1 }))
            }
            break
          case 'X':
            if (!modalOpened() && location.pathname !== ROUTES.DEVELOPER) {
              navigate(ROUTES.DEVELOPER)
            }
            break
        }
      } else {
        switch (event.key) {
          case '/':
            if (location.pathname !== ROUTES.READ) {
              setFindModal(true)
            }
            break
          case 'Escape':
            setLoginModal(false)
            setFindModal(false)
            break
        }
      }
    }
    addEventListener('keydown', handleKeyBinding)
    return () => {
      removeEventListener('keydown', handleKeyBinding)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, navigate, findModal, loginModal])

  const handleAuth = () => {
    if (user.loggedIn) {
      setUser({
        loggedIn: false,
        loading: false,
        data: undefined,
      })
      localStorage.removeItem('token')
    } else {
      openModal()
    }
  }

  const getBlur = () => {
    return loginModal || findModal
  }
  const getOpacity = () => {
    return loginModal || findModal
  }
  const toggleFind = () => {
    setFindModal(!findModal)
  }
  const openModal = () => {
    setLoginModal(true)
  }
  const closeModal = () => {
    setLoginModal(false)
  }

  const getFindModal = () => {
    if (!findModal) {
      return null
    }
    const newType = true
    return newType ? (
      <FindManga close={!findModal} closeButton={() => setFindModal(false)} />
    ) : (
      <div className="z-[5] fixed h-screen w-screen">
        <Find toggleFind={toggleFind} />
      </div>
    )
  }

  return (
    <div className="relative">
      {loginModal && (
        <div className="z-[5] fixed h-screen w-screen">
          <Login close={closeModal} />
        </div>
      )}
      {getFindModal()}
      <Auth />
      <header
        className="bg-gradient-to-b from-gray-950 z-[4] fixed w-screen"
        style={{
          filter: getBlur() ? 'blur(12px)' : 'blur(0px)',
        }}
      >
        <div className="h-[60px] flex justify-between px-4">
          <div className="flex">
            <div className="h-full a-center">
              <Logo />
            </div>
            <div className="ml-3 h-full a-center">
              <Button btnType="find" onClick={toggleFind} />
            </div>
          </div>
          <div className="a-center">
            {user.loggedIn ? (
              <Button btnType="auth" onClick={handleAuth}>
                <VscSignOut className="mr-2 text-xl" />
                <span className="w-12">Logout</span>
              </Button>
            ) : (
              <Button btnType="auth" onClick={handleAuth}>
                <VscSignIn className="mr-2 text-xl" />
                <span className="w-12">Login</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      <div
        style={{
          filter: getBlur() ? 'blur(12px)' : 'blur(0px)',
        }}
        className="fixed left-0 top-0 w-screen h-screen flex flex-col justify-center"
      >
        <div className="bg-ratio">
          <div className="relative bg-ratio">
            <div
              className="absolute bg-ratio background"
              style={{ backgroundImage: `url(${wall})` }}
            ></div>
            <div className="absolute z-[2] bg-ratio background-blur"></div>
          </div>
        </div>
      </div>
      <main
        className="relative"
        style={{
          minHeight: '100vh',
          filter: getBlur() ? 'blur(12px)' : 'blur(0px)',
          opacity: getOpacity() ? 0.2 : 1,
        }}
      >
        <div className="w-full pt-[70px]">{children}</div>
        <Footer />
      </main>
      <NavBar />
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node,
}

export default MainLayout

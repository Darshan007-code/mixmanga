import { PropTypes } from 'prop-types'
import { VscEye, VscEyeClosed, VscSignIn, VscClose } from 'react-icons/vsc'
import Button from '/src/components/Button'
import { useEffect, useState, useContext, useRef } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { FaShieldAlt } from 'react-icons/fa'
import Logo from '/src/components/Logo'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import backend from '/src/services/backend'
import Loading from '/src/components/Button/Loading'
import { useNavigate } from 'react-router-dom'
import { Context } from '/src/context'
import { ROUTES } from '/src/services/untils'

const Container = ({ modal, close }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [showPasswd, setShowPasswd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useContext(Context)

  const emailInputRef = useRef(null)

  useEffect(() => {
    if (user.loggedIn) {
      if (modal) {
        close()
      } else {
        navigate(ROUTES.HOME, { replace: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    let interval = null
    if (error) {
      interval = setTimeout(() => {
        setError(null)
      }, 3000)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [error])

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswd = (event) => {
    setPasswd(event.target.value)
  }
  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (validate({ email, passwd })) {
      setLoading(true)
      const body = { usermail: email, passwd }
      backend
        .post('/api/user/login', body)
        .then(({ data }) => {
          if (data.error) {
            setError(data.error)
            return
          }
          localStorage.setItem('token', data.jwt)
          setUser({
            loggedIn: true,
            data,
          })
        })
        .catch((error) => {
          setError('An Error occured')
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const validate = ({ email, passwd }) => {
    if (email === '') {
      setError('Invalid Email Address')
      return false
    }
    if (passwd === '') {
      setError('Invalid Password')
      return false
    }
    return true
  }

  return (
    <div className="w-[330px] glass v-center">
      <form className="w-full h-full" onSubmit={handleSubmit}>
        <div className="h-[60px] flex justify-between p-5 pt-8">
          <Logo />
          <div className="a-center -mt-1">
            {modal && (
              <Button btnType="icon" onClick={close}>
                <VscClose className="text-xl" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex float-start p-5 pt-3 w-full">
          <div className="relative w-full">
            <div className="absolute h-8 left-0 px-3 a-center">
              <MdAlternateEmail className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              name="email"
              ref={emailInputRef}
              onChange={handleEmail}
              className="h-8 w-[270px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="flex float-start p-5 pt-0 w-full">
          <div className="relative w-full">
            <div className="absolute h-8 left-0 px-3 a-center">
              <FaShieldAlt className="text-gray-400" />
            </div>
            <input
              type={showPasswd ? 'text' : 'password'}
              value={passwd}
              name="passwd"
              onChange={handlePasswd}
              className="h-8 w-[270px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
              placeholder="Enter Password"
            />
            <div className="absolute top-0 h-8 right-0 px-3 a-center">
              <button onClick={handleShowPasswd} type="button">
                {showPasswd ? (
                  <VscEye className="text-gray-200" />
                ) : (
                  <VscEyeClosed className="text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div className="px-5 pb-3">
            <p className="text-red-300 text-xs">{error}</p>
          </div>
        )}

        <div className="p-5 pt-0 pb-3 flex justify-between">
          <div className="pr-3 flex v-center">
            <Link to={ROUTES.SIGNUP}>
              <p className="text-sgreen text-xs cursor-pointer">
                Don&#39;t have an account?
              </p>
            </Link>
          </div>
          {loading ? (
            <Loading>
              <span>Loging...</span>
            </Loading>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2
                  rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm
                  transition ease-in-out duration-150
                  text-[#111827] bg-[#cbd5e1cc]
                  hover:bg-[#e5e7ebee]
                  disabled:opacity-25"
              >
                <div className="flex justify-center">
                  <div className="mr-1 a-center">
                    <span className="text-xs inline-flex">Login</span>
                  </div>
                  <div className="a-center">
                    <VscSignIn className="text-lg" />
                  </div>
                </div>
              </button>
            </motion.div>
          )}
        </div>
      </form>
    </div>
  )
}

Container.propTypes = {
  modal: PropTypes.bool,
  close: PropTypes.any,
}

export default Container

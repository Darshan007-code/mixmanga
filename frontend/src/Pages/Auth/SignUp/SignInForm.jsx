import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useEffect, useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { FaShieldAlt } from 'react-icons/fa'
import Logo from '/src/components/Logo'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LuShieldCheck } from 'react-icons/lu'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { FaRegUser } from 'react-icons/fa'
import Loading from '/src/components/Button/Loading'
import backend from '/src/services/backend'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '/src/services/untils'

const SignUpForm = () => {
  const navigate = useNavigate()
  const [showPasswd, setShowPasswd] = useState(false)
  const [form, setForm] = useState({
    username: '',
    usermail: '',
    passwd: '',
    cpasswd: '',
  })
  const [error, setError] = useState({})
  const [signUpError, setSignUpError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let interval = null
    if (signUpError) {
      interval = setTimeout(() => {
        setSignUpError(null)
      }, 5000)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [signUpError])

  const handleChange = (event) => {
    const data = { ...form, [event.target.name]: event.target.value }
    setForm(data)
    validate(event.target.name, data)
  }
  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd)
  }
  const handleSubmit = (event, { username, usermail, passwd, cpasswd }) => {
    event.preventDefault()
    if (!validate('all', { username, usermail, passwd, cpasswd })) {
      return
    }
    const body = { username, usermail, passwd, cpasswd }
    setLoading(true)
    backend
      .post('/api/user/register', body)
      .then(({ data }) => {
        if (data.error) {
          setSignUpError(data.error)
          return
        }
        navigate(ROUTES.LOGIN)
      })
      .catch((error) => {
        setSignUpError('Something went wrong')
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const validate = (param, { username, usermail, passwd, cpasswd }) => {
    let flag = true
    if (param === 'username' || param === 'all') {
      if (username === '') {
        setError({ ...error, username: undefined })
        flag = false
      } else if (3 > username.length || username.length > 30) {
        setError({
          ...error,
          username: 'Name must be of size 3 to 30 characters',
        })
        flag = false
      } else {
        setError({ ...error, username: undefined })
      }
    }
    if (param === 'usermail' || param === 'all') {
      if (usermail === '') {
        setError({ ...error, usermail: undefined })
        flag = false
      } else if (
        !/^[a-zA-Z0-9_.]{1,64}@[a-zA-Z0-9]{3,10}.com$/.test(usermail)
      ) {
        setError({ ...error, usermail: 'Unknown Email Format' })
        flag = false
      } else {
        setError({ ...error, usermail: undefined })
      }
    }
    if (param === 'passwd' || param === 'all') {
      if (passwd === '') {
        setError({ ...error, passwd: undefined })
        flag = false
      } else if (passwd.length < 8) {
        setError({ ...error, passwd: 'Contains atleast 8 chars' })
        flag = false
      } else {
        setError({ ...error, passwd: undefined })
      }
    }
    if (param === 'cpasswd' || param === 'all') {
      if (cpasswd === '') {
        setError({ ...error, cpasswd: undefined })
        flag = false
      } else if (passwd !== cpasswd) {
        setError({ ...error, cpasswd: "Password didn't match" })
        flag = false
      } else {
        setError({ ...error, cpasswd: undefined })
      }
    }
    return flag
  }

  return (
    <div className="w-full h-full a-center p-5 pb-[60px]">
      <div className="w-full md:w-[360px] glass glass hard v-center">
        <form className="w-full h-full" onSubmit={(e) => handleSubmit(e, form)}>
          <div className="h-[60px] flex justify-start p-5 pt-8">
            <Logo />
          </div>
          <div className="p-5 pt-3 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <FaRegUser className="text-gray-400" />
              </div>
              <input
                type="text"
                value={form.username}
                name="username"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                placeholder="Enter Username"
              />
            </div>
            {error.username && (
              <span className="-mb-5 text-red-300 text-xs">
                {error.username}
              </span>
            )}
          </div>
          <div className="p-5 pt-0 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <MdAlternateEmail className="text-gray-400" />
              </div>
              <input
                type="email"
                value={form.usermail}
                name="usermail"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                placeholder="Enter Email"
              />
            </div>
            {error.usermail && (
              <span className="-mb-5 text-red-300 text-xs">
                {error.usermail}
              </span>
            )}
          </div>
          <div className="p-5 pt-0 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <FaShieldAlt className="text-gray-400" />
              </div>
              <input
                type={showPasswd ? 'text' : 'password'}
                value={form.passwd}
                name="passwd"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
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
            {error.passwd && (
              <span className="-mb-5 text-red-300 text-xs">{error.passwd}</span>
            )}
          </div>
          <div className="p-5 pt-0 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <LuShieldCheck className="text-gray-400" />
              </div>
              <input
                type="password"
                value={form.cpasswd}
                name="cpasswd"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                placeholder="Confirm Password"
              />
            </div>
            {error.cpasswd && (
              <span className="-mb-5 text-red-300 text-xs">
                {error.cpasswd}
              </span>
            )}
            {signUpError && (
              <span className="-mb-5 text-red-300 text-xs">{signUpError}</span>
            )}
          </div>
          <div className="p-5 pt-0 pb-3 flex justify-between">
            <div className="pr-3 flex v-center">
              <Link to={ROUTES.LOGIN}>
                <p className="text-sgreen text-xs cursor-pointer">
                  Already have an account?
                </p>
              </Link>
            </div>
            {loading ? (
              <Loading>
                <span>Registering...</span>
              </Loading>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
                    <div className="a-center mr-1">
                      <span className="text-xs inline-flex">SignUp</span>
                    </div>
                    <div className="a-center">
                      <PiUserCircleDuotone className="text-lg" />
                    </div>
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm

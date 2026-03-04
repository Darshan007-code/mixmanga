import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useEffect, useContext, useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { FaShieldAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { LuShieldCheck } from 'react-icons/lu'
import { GoShieldLock } from 'react-icons/go'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { FaRegUser } from 'react-icons/fa'
import { Context } from '/src/context'
import Loading from '/src/components/Button/Loading'
import backend from '/src/services/backend'
import { GrPowerReset } from 'react-icons/gr'

const UpdateForm = () => {
  const [showPasswd, setShowPasswd] = useState(false)
  const [showNPasswd, setShowNPasswd] = useState(false)
  const [user, setUser] = useContext(Context)

  const getDefaultValues = () => {
    const data = {
      username: user.data?.name || '',
      usermail: user.data?.email || '',
      passwd: '',
      npasswd: '',
      cpasswd: '',
    }
    return data
  }

  const [form, setForm] = useState(getDefaultValues())
  const [error, setError] = useState({})
  const [updateError, setUpdateError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    let interval = null
    if (updateError) {
      interval = setTimeout(() => {
        setUpdateError(null)
      }, 5000)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [updateError])

  useEffect(() => {
    let interval = null
    if (updateSuccess) {
      interval = setTimeout(() => {
        setUpdateSuccess(null)
      }, 5000)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [updateSuccess])

  const handleChange = (event) => {
    const data = { ...form, [event.target.name]: event.target.value }
    setForm(data)
    validate(event.target.name, data)
  }
  const resetForm = () => {
    setForm(getDefaultValues())
    setError({})
  }
  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd)
  }
  const handleShowNPasswd = () => {
    setShowNPasswd(!showNPasswd)
  }

  const handleSubmit = (event, { username, passwd, npasswd, cpasswd }) => {
    event.preventDefault()
    if (!validate('all', { username, passwd, npasswd, cpasswd })) {
      return
    }
    const body = { username, passwd, npasswd }
    setLoading(true)
    backend
      .post('/api/user/update-profile', body)
      .then(({ data }) => {
        if (data.error) {
          setUpdateError(data.error)
          return
        }
        localStorage.setItem('token', data.jwt)
        setUser({
          loggedIn: user.loggedIn,
          data: { ...user.data, name: data.name },
        })
        setUpdateSuccess('Profile updated Successfully')
      })
      .catch((error) => {
        setUpdateError('Something went wrong')
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const validate = (param, { username, passwd, npasswd, cpasswd }) => {
    let flag = true
    if (param === 'username' || param === 'all') {
      if (3 > username.length || username.length > 30) {
        setError({
          ...error,
          username: 'Name must be of size 3 to 30 characters',
        })
        flag = false
      } else {
        setError({ ...error, username: undefined })
      }
    }
    if (param === 'npasswd' || param === 'all') {
      if (npasswd !== '' && npasswd.length < 8) {
        setError({ ...error, npasswd: 'Contains atleast 8 chars' })
        flag = false
      } else {
        setError({ ...error, npasswd: undefined })
      }
    }
    if (param === 'cpasswd' || param === 'all') {
      if (cpasswd === '') {
        setError({ ...error, cpasswd: undefined })
        flag = flag && npasswd === cpasswd
      } else if (npasswd !== cpasswd) {
        setError({ ...error, cpasswd: "Password didn't match" })
        flag = false
      } else {
        setError({ ...error, cpasswd: undefined })
      }
    }
    if (param === 'all') {
      if (passwd === '') {
        flag = false
      }
    }
    return flag
  }

  return (
    <div className="w-full h-full a-center">
      <div className="w-full md:w-[360px] glass p-2 rounded-2xl v-center border border-white/5 shadow-xl">
        <form className="w-full h-full px-2" onSubmit={(e) => handleSubmit(e, form)}>
          <div className="space-y-3 py-4">
            <div className="relative group">
              <div className="absolute h-9 left-0 px-3 a-center">
                <MdAlternateEmail className="text-slate-500 group-focus-within:text-sgreen transition-colors" />
              </div>
              <input
                type="email"
                value={form.usermail}
                name="usermail"
                disabled={true}
                className="h-9 w-full bg-slate-900/50 py-2 px-10 text-slate-400
                  rounded-xl ring-1 ring-white/10 focus:ring-2 focus:ring-sgreen/50
                  tracking-wide text-xs opacity-75 cursor-not-allowed"
                placeholder="Enter Email"
              />
            </div>

            <div className="relative group">
              <div className="absolute h-9 left-0 px-3 a-center">
                <FaRegUser className="text-slate-500 group-focus-within:text-sgreen transition-colors" />
              </div>
              <input
                type="text"
                value={form.username}
                name="username"
                onChange={handleChange}
                className="h-9 w-full bg-slate-900/50 py-2 px-10 text-white
                  rounded-xl ring-1 ring-white/10 focus:ring-2 focus:ring-sgreen/50
                  transition-all duration-300 tracking-wide text-xs outline-none"
                placeholder="Enter Username"
              />
              {error.username && (
                <span className="absolute -bottom-4 left-2 text-[10px] text-red-400 font-medium tracking-tight">
                  {error.username}
                </span>
              )}
            </div>

            <div className="relative group">
              <div className="absolute h-9 left-0 px-3 a-center">
                <GoShieldLock className="text-slate-500 group-focus-within:text-sgreen transition-colors" />
              </div>
              <input
                type={showNPasswd ? 'text' : 'password'}
                value={form.npasswd}
                name="npasswd"
                onChange={handleChange}
                className="h-9 w-full bg-slate-900/50 py-2 px-10 text-white
                  rounded-xl ring-1 ring-white/10 focus:ring-2 focus:ring-sgreen/50
                  transition-all duration-300 tracking-wide text-xs outline-none"
                placeholder="Enter New Password"
              />
              <div className="absolute top-0 h-9 right-0 px-3 a-center">
                <button onClick={handleShowNPasswd} type="button" className="hover:text-sgreen transition-colors">
                  {showNPasswd ? <VscEye /> : <VscEyeClosed />}
                </button>
              </div>
              {error.npasswd && (
                <span className="absolute -bottom-4 left-2 text-[10px] text-red-400 font-medium tracking-tight">
                  {error.npasswd}
                </span>
              )}
            </div>

            <div className="relative group pt-1">
              <div className="absolute h-9 left-0 px-3 a-center top-1">
                <FaShieldAlt className="text-slate-500 group-focus-within:text-teal-400 transition-colors" />
              </div>
              <input
                type={showPasswd ? 'text' : 'password'}
                value={form.passwd}
                name="passwd"
                onChange={handleChange}
                className="h-9 w-full bg-slate-950/80 py-2 px-10 text-white
                  rounded-xl ring-2 ring-teal-500/30 focus:ring-teal-400/60
                  transition-all duration-300 tracking-wide text-xs outline-none placeholder:text-slate-600"
                placeholder="Current Password (Required)"
              />
              <div className="absolute top-1 h-9 right-0 px-3 a-center">
                <button onClick={handleShowPasswd} type="button" className="hover:text-teal-400 transition-colors text-slate-500">
                  {showPasswd ? <VscEye /> : <VscEyeClosed />}
                </button>
              </div>
              {error.passwd && (
                <span className="absolute -bottom-4 left-2 text-[10px] text-red-400 font-medium tracking-tight">
                  {error.passwd}
                </span>
              )}
            </div>
          </div>

          {(updateError || updateSuccess) && (
            <div className="mt-2 px-2 text-center">
              {updateError && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">{updateError}</p>}
              {updateSuccess && <p className="text-[10px] text-sgreen font-bold uppercase tracking-widest">{updateSuccess}</p>}
            </div>
          )}

          <div className="py-4 flex items-center justify-between gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetForm}
              type="button"
              className="flex-1 h-9 rounded-xl font-bold text-[10px] uppercase tracking-widest
                text-slate-400 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            >
              Reset
            </motion.button>
            
            {loading ? (
              <div className="flex-1 h-9 a-center bg-sgreen/20 rounded-xl">
                <Loading size={16} />
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 h-9 rounded-xl font-black text-[10px] uppercase tracking-widest
                  text-slate-900 bg-sgreen hover:bg-teal-300 shadow-lg shadow-sgreen/20 transition-all"
              >
                Update
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateForm

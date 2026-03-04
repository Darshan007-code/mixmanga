import { useContext, useEffect } from 'react'
import { Context } from '/src/context'
import backend from '/src/services/backend'

const Auth = () => {
  const [user, setUser] = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || user.loggedIn) {
      setUser({
        loggedIn: !!user.loggedIn,
        loading: false,
        data: user.data || undefined,
      })
      return
    }
    setUser({
      loggedIn: false,
      loading: true,
      data: undefined,
    })
    backend
      .post('/api/user/profile', {})
      .then(({ data }) => {
        if (data.error) {
          localStorage.removeItem('token')
          return
        }
        setUser({
          loggedIn: true,
          loading: false,
          data,
        })
      })
      .catch((error) => {
        localStorage.removeItem('token')
        setUser({
          loggedIn: false,
          loading: false,
          data: undefined,
        })
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

export default Auth

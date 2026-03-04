import Container from '/src/components/Login/Container'
import AuthLayout from '/src/layouts/AuthLayout'
import Spinner from '/src/components/Spinner'
import { Context } from '/src/context'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '/src/services/untils'

const Login = () => {
  const [user] = useContext(Context)

  if (user.loading) {
    return (
      <AuthLayout>
        <Spinner />
      </AuthLayout>
    )
  }

  if (user.loggedIn) {
    return <Navigate to={ROUTES.HOME} replace={true} />
  }

  return (
    <AuthLayout>
      <div className="w-full h-full a-center p-5">
        <Container />
      </div>
    </AuthLayout>
  )
}

export default Login

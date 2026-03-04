import AuthLayout from '/src/layouts/AuthLayout'
import SignUpForm from './SignInForm'
import Spinner from '/src/components/Spinner'
import { Context } from '/src/context'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '/src/services/untils'

const SignUp = () => {
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
      <SignUpForm />
    </AuthLayout>
  )
}

export default SignUp

import { PropTypes } from 'prop-types'
import wall from '/src/assets/images/pic_1.jpg'
import Logo from '/src/components/Logo'
import Auth from '/src/components/Auth'

const AuthLayout = ({ children }) => {
  return (
    <div className="relative">
      <Auth />
      <header className="bg-gradient-to-b from-gray-950 z-[4] fixed w-screen">
        <div className="h-[60px] flex justify-start px-4">
          <div className="flex">
            <div className="h-full a-center">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <div className="fixed left-0 top-0 w-screen h-screen flex flex-col justify-center">
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
          height: '100vh',
        }}
      >
        <div className="w-full pt-[70px] h-full">{children}</div>
      </main>
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
}

export default AuthLayout

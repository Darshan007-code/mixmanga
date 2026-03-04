import { Link } from 'react-router-dom'
import Logo from '/src/components/Logo'
import { FaDiscord, FaTelegram } from 'react-icons/fa'
import Clock from './Clock'
import { ROUTES } from '/src/services/untils'

const Footer = () => {
  return (
    <footer className="lg:px-5 md:px-5 px-2 z-[5]">
      <div className="flex mb-1 min-h-[120px]">
        <div className="flex flex-col justify-center">
          <div className="md:inline-flex hidden px-4">
            <Logo className="text-4xl" />
          </div>
          <div className="md:hidden inline-flex px-4">
            <Logo className="text-3xl" />
          </div>
        </div>
        <div className="vr"></div>
        <div className="p-3 flex flex-col justify-between">
          <div className="flex pt-2 pb-1">
            <div>
              <span className="text-sm text-gray-100">Join Us Now</span>
              <br />
              <span className="text-lg text-gray-100 font-semibold">
                <span style={{ fontWeight: 'bolder', color: '#9fe6cd' }}>
                  Mix
                </span>
                Manga
              </span>
            </div>
            <div className="a-center ml-3 cursor-pointer">
              <FaDiscord className="text-gray-100 text-3xl hover:scale-110" />
            </div>
            <div className="a-center ml-2 cursor-pointer">
              <FaTelegram className="text-gray-100 text-2xl hover:scale-110" />
            </div>
          </div>
          <hr className="border-gray-100 border-opacity-40" />
          <div className="flex a-center">
            <div className="w-full pt-1 text-sm text-gray-100">
              <Clock />
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-end ml-auto pr-6">
          <p className="text-gray-100 mb-5 px-1 text-right">
            <small className="uppercase font-semibold">
              <a target="_blank" href="https://github.com/Darshan007-code">
                Developed by
              </a>
            </small>
          </p>
        </div>
      </div>
      <div className="md:hidden flex flex-col justify-end ml-auto pr-6">
        <p className="text-gray-100 mb-5 px-1 text-right">
          <small className="uppercase font-semibold">
            <a target="_blank" href="https://github.com/Darshan007-code">
              Developed by
            </a>
          </small>
        </p>
      </div>
      <div className="mx-5 py-3">
        <hr className="border-gray-100 border-opacity-30" />
        <div className="mt-4">
          <p className="text-gray-100 mb-2 px-1">
            <small>
              Mix Manga does not store any files on our server, we only linked
              to the media which is hosted on 3rd party services.
            </small>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

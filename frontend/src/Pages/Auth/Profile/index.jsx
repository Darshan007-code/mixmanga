import MainLayout from '/src/layouts/MainLayout'
import UpdateForm from './UpdateForm'
import ProfilePic from '/src/assets/images/umaru.png'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '/src/context'
import Slider from './Slider'
import Spinner from '/src/components/Spinner'
import { ROUTES } from '/src/services/untils'
import { VscLibrary, VscHeart, VscSettingsGear } from 'react-icons/vsc'

const Profile = () => {
  const navigate = useNavigate()
  const [user] = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!user.loading && (!token || !user.loggedIn)) {
      navigate(ROUTES.LOGIN, { replace: true })
      return
    }
  }, [user, navigate])

  if (user.loading || !user.loggedIn) {
    return (
      <MainLayout>
        <div className="h-screen a-center">
          <Spinner />
        </div>
      </MainLayout>
    )
  }

  const listCount = user.data?.userList?.length || 0
  const favCount = user.data?.favourites?.length || 0

  return (
    <MainLayout>
      <div className="xl:container mx-auto px-4 pt-10">
        {/* Profile Header */}
        <div className="glass glass-hard rounded-3xl p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sgreen to-teal-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={ProfilePic} 
                className="relative h-[200px] w-[200px] rounded-full object-cover border-4 border-sgreen shadow-2xl" 
                alt="Profile"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                {user.data?.name}
              </h1>
              <p className="text-sgreen font-medium mb-6 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-sgreen animate-pulse"></span>
                Active Member
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="glass p-4 rounded-2xl min-w-[120px] text-center border border-white/5">
                  <VscLibrary className="text-sgreen text-2xl mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{listCount}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Total List</p>
                </div>
                <div className="glass p-4 rounded-2xl min-w-[120px] text-center border border-white/5">
                  <VscHeart className="text-red-400 text-2xl mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{favCount}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Favourites</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 mb-4 text-slate-300 md:justify-start justify-center">
                <VscSettingsGear className="animate-spin-slow" />
                <span className="text-xs uppercase tracking-widest font-bold">Account Settings</span>
              </div>
              <UpdateForm />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 pb-20">
          <section>
            <div className="flex items-center gap-3 px-4 mb-6">
              <VscLibrary className="text-sgreen text-2xl" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Your <span className="text-sgreen">Reading List</span>
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-sgreen/20 to-transparent"></div>
            </div>
            <Slider list={user.data?.userList} name="userlist" />
          </section>

          <section>
            <div className="flex items-center gap-3 px-4 mb-6">
              <VscHeart className="text-red-400 text-2xl" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Your <span className="text-red-400">Favourites</span>
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-red-400/20 to-transparent"></div>
            </div>
            <Slider list={user.data?.favourites} name="favourites" />
          </section>
        </div>
      </div>
    </MainLayout>
  )
}

export default Profile

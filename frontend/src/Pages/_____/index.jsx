import MainLayout from '/src/layouts/MainLayout'
import { VscGithub } from 'react-icons/vsc'

const UnderScore = () => {
  return (
    <MainLayout>
      <div className="h-[80vh] a-center">
        <div
          className="text-gray-200 text-gap-2 text-center flex justify-center"
          style={{
            fontSize: 12,
          }}
        >
          <div className="a-center pr-3">
            <p>Developed by</p>
          </div>
          <div>
            <a
              target="_blank"
              href="https://github.com/sandy-5000"
              className="flex justify-center"
            >
              <div className="a-center">
                <VscGithub className="pr-2 text-2xl" />
              </div>
              <div className="a-center">
                <span>Sandy-5000</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default UnderScore

import MainLayout from '/src/layouts/MainLayout'

const Error = () => {
  return (
    <MainLayout>
      <div className="h-[80vh] a-center">
        <p
          className="text-gray-200 text-gap-2 text-center"
          style={{
            fontSize: 16,
          }}
        >
          Something went Wrong!
        </p>
      </div>
    </MainLayout>
  )
}

export default Error

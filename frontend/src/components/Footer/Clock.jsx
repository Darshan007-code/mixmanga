import { useEffect, useState, memo } from 'react'
import { IoLogoIonic } from 'react-icons/io'

const Clock = () => {
  const [time, setTime] = useState({ H: '00', M: '00', S: '00' })

  useEffect(() => {
    const timer = setTimeout(getTime, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [time])

  const getTime = () => {
    const today = new Date()
    let H = today.getHours()
    let M = today.getMinutes()
    let S = today.getSeconds()
    H = H < 10 ? '0' + H : H
    M = M < 10 ? '0' + M : M
    S = S < 10 ? '0' + S : S
    setTime({ H, M, S })
  }

  return (
    <p className="text-slate-200 flex">
      <span className="a-center">
        <IoLogoIonic className="animate-spin text-lg mr-2 text-slate-200" />
      </span>
      {time.H}
      <span className="px-[1px]">:</span>
      {time.M}
      <span className="text-sgreen">
        <span className="px-[1px]">:</span>
        {time.S}
      </span>
    </p>
  )
}

const MemoClock = memo(Clock)

export default MemoClock

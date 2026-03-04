const ROUTES = {
  HOME: '/home',
  RECENT: '/recent',
  TRENDING: '/trending',
  DETAILS: '/details',
  EXPLORE: '/explore',
  READ: '/read',
  LOGIN: '/user/login',
  SIGNUP: '/user/signup',
  PROFILE: '/user/profile',
  DEVELOPER: '/_____',
}

const getQueryParams = (object) => {
  const arr = []
  for (let [k, v] of Object.entries(object)) {
    if (typeof v === 'object') {
      throw new Error('Should not contain deep level objects')
    }
    k = encodeURIComponent(k)
    v = encodeURIComponent(v)
    arr.push(k + '=' + v)
  }
  return '?' + arr.join('&')
}

const getDate = (x) => {
  let p = new Date(x * 1000)
  let dateExtention = 'th',
    date = p.getDate()
  if (date < 11 || 13 < date) {
    if (date % 10 == 1) {
      dateExtention = 'st'
    } else if (date % 10 == 2) {
      dateExtention = 'nd'
    } else if (date % 10 == 3) {
      dateExtention = 'rd'
    }
  }
  return (
    date +
    dateExtention +
    ' ' +
    p.toString().slice(4, 7) +
    ' ' +
    p.toString().slice(16, 21)
  )
}

const dateToString = (year, month, day) => {
  let p = new Date(year, month - 1, day)
  let dateExtention = 'th',
    date = p.getDate()
  if (date < 11 || 13 < date) {
    if (date % 10 == 1) {
      dateExtention = 'st'
    } else if (date % 10 == 2) {
      dateExtention = 'nd'
    } else if (date % 10 == 3) {
      dateExtention = 'rd'
    }
  }
  return (
    date +
    dateExtention +
    ' ' +
    p.toString().slice(4, 7) +
    ', ' +
    p.getFullYear()
  )
}

const truncate = (longString, length) => {
  if (!longString) {
    return 'No synopsis Avaliable.'
  }
  if (longString.length > length - 3) {
    return longString.slice(0, length - 3) + '...'
  }
  return longString
}

const getAiredUpTo = (id, value) => {
  const airedUpTo = {
    21: 1122,
  }
  return Math.max(airedUpTo[id] || 1, value)
}

export { ROUTES, getQueryParams, getDate, dateToString, truncate, getAiredUpTo }

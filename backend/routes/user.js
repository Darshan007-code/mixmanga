import express from 'express'
import bodyParser from 'body-parser'
import UserController from '../controllers/user.js'
import verify from '../utils/validate.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const app = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))

const SALT = '$2b$12$IFMhCvLBD/p1SGMAPvFBre'
const userCtrl = UserController()

app.route('/login').post(async (req, res) => {
  const { usermail, passwd } = req.body
  const hash = await bcrypt.hash(passwd + usermail, SALT)
  const data = await userCtrl.authenticate(req, { usermail, passwd: hash })
  if (data.status == 404) {
    return res.status(200).json({ error: 'Usermail or password incorrect' })
  }
  const tokenData = {
    _id: data.result._id,
    name: data.result.name,
    email: data.result.email,
    passwd: data.result.passwd,
  }
  let token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
  return res.status(200).json({ jwt: token, ...data.result, passwd: null })
})

app.route('/register').post(async (req, res) => {
  const { username, usermail, passwd, cpasswd } = req.body
  if (cpasswd != passwd) {
    return res.status(200).json({ error: "Password does't match!" })
  }
  if (passwd.length < 8) {
    return res.status(200).json({ error: 'Password too short!' })
  }
  const hash = await bcrypt.hash(passwd + usermail, SALT)
  const data = await userCtrl.createUser(req, { username, usermail, passwd: hash })
  if (data.status == 400) {
    return res.status(200).json({ error: data.result })
  }
  return res.status(200).json({ ...data.result, passwd: null })
})

app.route('/profile').post(async (req, res) => {
  const user = verify(req.headers)
  if (!user) {
    return res.status(200).json({ error: 'not authorized' })
  }
  const data = await userCtrl.authenticate(req, {
    usermail: user.email,
    passwd: user.passwd,
  })
  return res.status(200).json({ ...data.result, passwd: null })
})

app.route('/update-profile').post(async (req, res) => {
  const user = verify(req.headers)
  const { username, passwd, npasswd } = req.body
  if (!user) {
    return res.status(200).json({ error: 'not authorized' })
  }
  const email = user.email
  const hash = await bcrypt.hash(passwd + email, SALT)
  if (user.passwd !== hash) {
    return res.status(200).json({ error: 'Password Incorrect' })
  }
  const nhash = await bcrypt.hash(npasswd + email, SALT)
  const data = await userCtrl.updateUser(req, {
    email,
    username,
    passwd: hash,
    npasswd: npasswd === '' ? '' : nhash,
  })
  const tokenData = {
    _id: data.result._id,
    name: data.result.name,
    email: data.result.email,
    passwd: data.result.passwd,
  }
  let token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
  return res.status(200).json({ jwt: token, ...data.result, passwd: null })
})

app.route('/add-to-list').post(async (req, res) => {
  const user = verify(req.headers)
  if (!user) {
    return res.status(200).json({ error: 'not authorized', errorCode: 401 })
  }
  const email = user.email
  const { id, title, coverImage } = req.body
  if (!id || !title || !coverImage) {
    return res.status(200).json({ error: 'Invalid request' })
  }
  const data = await userCtrl.addToList(req, { email, id, title, coverImage })
  return res.status(200).json(data.result)
})

app.route('/remove-from-list').post(async (req, res) => {
  const user = verify(req.headers)
  if (!user) {
    return res.status(200).json({ error: 'not authorized', errorCode: 401 })
  }
  const email = user.email
  const { id } = req.body
  if (!id) {
    return res.status(200).json({ error: 'Invalid request' })
  }
  const data = await userCtrl.removeFromList(req, { email, id })
  return res.status(200).json(data.result)
})

app.route('/add-to-favourites').post(async (req, res) => {
  const user = verify(req.headers)
  if (!user) {
    return res.status(200).json({ error: 'not authorized', errorCode: 401 })
  }
  const email = user.email
  const { id, title, coverImage } = req.body
  if (!id || !title || !coverImage) {
    return res.status(200).json({ error: 'Invalid request' })
  }
  const data = await userCtrl.addToFavourites(req, { email, id, title, coverImage })
  return res.status(200).json(data.result)
})

app.route('/remove-from-favourites').post(async (req, res) => {
  const user = verify(req.headers)
  if (!user) {
    return res.status(200).json({ error: 'not authorized', errorCode: 401 })
  }
  const email = user.email
  const { id } = req.body
  if (!id) {
    return res.status(200).json({ error: 'Invalid request' })
  }
  const data = await userCtrl.removeFromFavourites(req, { email, id })
  return res.status(200).json(data.result)
})

const user = app
export default user

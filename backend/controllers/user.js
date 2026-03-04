export default function UserController() {
  return {
    authenticate: async function (req, { usermail, passwd }) {
      const db = req.app.locals.db;
      const user = await db.collection('mausers').findOne({ email: usermail, passwd })
      if (!user) {
        return { status: 404, result: null }
      }
      return { status: 200, result: user }
    },
    createUser: async function (req, { username, usermail, passwd }) {
      const db = req.app.locals.db;
      let user = {
        name: username,
        email: usermail,
        passwd,
        created_on: new Date(),
        userList: [],
        favourites: [],
      }
      let errors = {
        11000: 'User already exists!',
      }
      try {
        var result = await db.collection('mausers').insertOne(user)
        return { status: 201, result: { ...user, _id: result.insertedId } }
      } catch (e) {
        console.log(e)
        return {
          status: 400,
          result: errors[e.code] || 'User Creation failed!',
        }
      }
    },
    updateUser: async function (req, { username, email, passwd, npasswd }) {
      const db = req.app.locals.db;
      try {
        let newData = {}
        if (username && username != '') {
          newData.name = username
        }
        if (npasswd && npasswd.trim() != '') {
          newData.passwd = npasswd
        }
        var result = await db.collection('mausers').findOneAndUpdate({ email, passwd }, { $set: newData }, {
          returnDocument: 'after',
        })
        return { status: 204, result: result.value }
      } catch (e) {
        return { status: 400, result: 'User Updation failed!' }
      }
    },
    addToList: async function (req, { email, id, title, coverImage }) {
      const db = req.app.locals.db;
      try {
        const item = {
          id,
          title,
          coverImage,
        }
        let user = await db.collection('mausers').findOne({ email }, { projection: { passwd: 0 } })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        if (user.userList.length >= 50) {
          return {
            status: 400,
            result: { error: "Can't add more than 50 items" },
          }
        }
        for (let item of user.userList) {
          if (item.id === id) {
            return {
              status: 200,
              result: { error: 'Already Added' },
            }
          }
        }
        await db.collection('mausers').updateOne({ email }, { $push: { userList: item } })
        user.userList.push(item)
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Add to List failed!' },
        }
      }
    },
    removeFromList: async function (req, { email, id }) {
      const db = req.app.locals.db;
      try {
        let user = await db.collection('mausers').findOne({ email }, { projection: { passwd: 0 } })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        user.userList = user.userList.filter((item) => item.id != id)
        await db.collection('mausers').updateOne({ email }, { $set: { userList: user.userList } })
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Remove from List failed!' },
        }
      }
    },
    addToFavourites: async function (req, { email, id, title, coverImage }) {
      const db = req.app.locals.db;
      try {
        const item = {
          id,
          title,
          coverImage,
        }
        let user = await db.collection('mausers').findOne({ email }, { projection: { passwd: 0 } })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        if (user.favourites.length >= 50) {
          return {
            status: 400,
            result: { error: "Can't add more than 50 items" },
          }
        }
        for (let item of user.favourites) {
          if (item.id === id) {
            return {
              status: 200,
              result: { error: 'Already Added' },
            }
          }
        }
        await db.collection('mausers').updateOne({ email }, { $push: { favourites: item } })
        user.favourites.push(item)
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Add to List failed!' },
        }
      }
    },
    removeFromFavourites: async function (req, { email, id }) {
      const db = req.app.locals.db;
      try {
        let user = await db.collection('mausers').findOne({ email }, { projection: { passwd: 0 } })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        user.favourites = user.favourites.filter((item) => item.id != id)
        await db.collection('mausers').updateOne({ email }, { $set: { favourites: user.favourites } })
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Remove from Favourites Failed!' },
        }
      }
    },
  }
}

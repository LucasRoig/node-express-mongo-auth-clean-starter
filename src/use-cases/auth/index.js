import makeRegisterUser from './register-user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { usersDb } from '../../data-access'

const PRIVATE_KEY = process.env.PRIVATE_KEY
const hash = pass => bcrypt.hash(pass, 10)
//TODO: handle expiration date
const generateToken = user => jwt.sign(user, PRIVATE_KEY)
const validateToken = token => {
  try {
    return jwt.verify(token, PRIVATE_KEY)
  } catch (e) {
    return null
  }
}

const registerUser = makeRegisterUser({ userDb: usersDb, hash})

export { registerUser }

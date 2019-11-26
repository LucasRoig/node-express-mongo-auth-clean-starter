import makeRegisterUser from './register-user'
import makeLoginUser from './login-user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { usersDb } from '../../data-access'

const PRIVATE_KEY = process.env.PRIVATE_KEY
const hash = pass => bcrypt.hash(pass, 10)
//TODO: handle expiration date
const generateJwtToken = user => jwt.sign(user, PRIVATE_KEY)
const comparePassword = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword)
const validateToken = token => {
  try {
    return jwt.verify(token, PRIVATE_KEY)
  } catch (e) {
    return null
  }
}
const loginUser = makeLoginUser(usersDb, comparePassword, generateJwtToken)
const registerUser = makeRegisterUser({ userDb: usersDb, hash})

export { registerUser, loginUser }

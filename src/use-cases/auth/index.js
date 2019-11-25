import makeRegisterUser from './register-user'
import bcrypt from 'bcrypt'
import { usersDb } from '../../data-access'

//TODO: use bcrypt
const hash = pass => bcrypt.hash(pass, 10)

const registerUser = makeRegisterUser({ userDb: usersDb, hash})

export { registerUser }

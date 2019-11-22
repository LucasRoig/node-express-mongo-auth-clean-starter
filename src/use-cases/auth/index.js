import makeRegisterUser from './register-user'
import { usersDb } from '../../data-access'

//TODO: use bcrypt
const hash = p => p

const registerUser = makeRegisterUser({ userDb: usersDb, hash})

export { registerUser }

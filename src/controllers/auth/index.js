import makeRegister from './register'
import { registerUser } from '../../use-cases/auth'

const register = makeRegister(registerUser)

const AuthController = Object.freeze({
  register
})

export default AuthController

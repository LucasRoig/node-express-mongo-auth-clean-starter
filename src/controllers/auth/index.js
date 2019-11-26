import makeRegister from './register'
import makeLogin from './login'
import { registerUser, loginUser } from '../../use-cases/auth'

const register = makeRegister(registerUser)
const login = makeLogin(loginUser)

const AuthController = Object.freeze({
  register,
  login
})

export default AuthController

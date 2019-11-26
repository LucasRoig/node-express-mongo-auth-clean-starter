import makeFakeUser from '../../../__test__/fixtures/user'
import makeLoginUser from './login-user'
describe('use case login', () => {

  it('returns a jwt token', async () => {
    const jwtToken = 'JwtToken'
    const userDb = {
      findByEmail: () => true,
    }
    const comparePassword = () => true
    const makeJwtToken = () => jwtToken
    const loginUser = makeLoginUser(userDb, comparePassword, makeJwtToken)
    const actual = await loginUser("bli", "blu")
    expect(actual).toStrictEqual(jwtToken)
  })
  it('throws if user is not found', async () => {
    const userDb = {
      findByEmail: () => null,
    }
    const loginUser = makeLoginUser(userDb, () => true, () => 'jwt')
    await expect(loginUser('bli','blu')).rejects.toThrow('Incorrect email or password')
  })
  it('throws password is wrong', async () => {
    const userDb = {
      findByEmail: () => true,
    }
    const loginUser = makeLoginUser(userDb, () => false, () => 'jwt')
    await expect(loginUser('bli','blu')).rejects.toThrow('Incorrect email or password')
  })
})

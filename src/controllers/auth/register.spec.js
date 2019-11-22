import makeRegister from './register'
import makeFakeUser from '../../../__test__/fixtures/user'

describe('register user controller', () => {
  it('successfully register an user', async () => {
    const registerUser = makeRegister( u => u)
    const user = await makeFakeUser()
    const request = { body: user }
    const expected = {
      statusCode: 201,
      body: { user }
    }
    const actual = await registerUser(request)
    expect(actual).toStrictEqual(expected)
  })
  it('reports errors', async () => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    const errorMessage = "error"
    const registerUser = makeRegister(u => {
      throw Error(errorMessage)
    })
    const user = await makeFakeUser()

    const request = { body: user }
    const expected = {
      statusCode: 400,
      body: { error: errorMessage }
    }
    const actual = await registerUser(request)
    expect(actual).toStrictEqual(expected)
    console.error.mockRestore()
  })
})

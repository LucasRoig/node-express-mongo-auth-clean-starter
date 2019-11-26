import makeLogin from './login'
describe('login user controller', () => {
  it('successfully returns a jwt token', async () => {
    const request = {
      body:{
        email: 'test',
        password: 'test'
      }
    }
    const loginUser = (email, password) => ({email, password})
    const login = makeLogin(loginUser)
    const expected = {
      statusCode: 200,
      body:{
        token: {
          email: request.body.email,
          password: request.body.password
        }
      }
    }
    const actual = await login(request);
    expect(expected).toStrictEqual(actual)
  })
  it('reports errors', async () => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    const request = {
      body:{
        email: 'test',
        password: 'test'
      }
    }
    const errorMessage = "error"
    const loginUser = () => {
      throw Error(errorMessage)
    }
    const expected = {
      statusCode: 400,
      body: { error: errorMessage }
    }
    const login = makeLogin(loginUser)
    const actual = await login(request)
    expect(actual).toStrictEqual(expected)
    console.error.mockRestore()
  })
})

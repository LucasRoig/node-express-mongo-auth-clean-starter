export default function makeRegister (registerUser) {
  return async function register (httpRequest) {
    try {
      const user = await registerUser(httpRequest.body)
      return {
        statusCode: 201,
        body: { user }
      }
    } catch (e) {
      //TODO: Real logger ?
      console.error(e)

      return {
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}

export default function makeLogin (loginUseCase) {
  return async function login (httpRequest) {
    try {
      const token = await loginUseCase(httpRequest.body.email, httpRequest.body.password)
      return {
        statusCode: 200,
        body: {
          token
        }
      }
    } catch (e) {
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

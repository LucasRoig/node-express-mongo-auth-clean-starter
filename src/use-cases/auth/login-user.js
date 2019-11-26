export default function makeLoginUser(userDb, comparePassword, generateJwtToken) {
  return async function loginUser (email, password) {
    let user = await userDb.findByEmail(email)
    if (!user) {
      throw new Error('Incorrect email or password')
    } else {
      const isPasswordCorrect = await comparePassword(password, user.password)
      if(!isPasswordCorrect){
        throw new Error('Incorrect email or password')
      }
    }
    return generateJwtToken(user)
  }
}

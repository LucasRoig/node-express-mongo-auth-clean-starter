import makeUser from '../../models/user'
export default function makeRegisterUser ({ userDb, hash }) {
  return async function registerUser ({ password, passwordConfirmation, ...userInfo }) {
    const user = makeUser(userInfo)
    const emailNotFree = await userDb.findByEmail(user.getEmail())
    if (emailNotFree) {
      throw Error('This email is already associated with an account.')
    }
    const usernameNotFree = await userDb.findByUsername(user.getUsername())
    if (usernameNotFree) {
      throw Error('This username is already taken.')
    }
    if(!password || password.length === 0){
      throw Error('The password cannot be empty.')
    }
    if(password !== passwordConfirmation){
      throw Error('The password confirmation does not match the password.')
    }
    const { password: _, ...insertedUser } = await userDb.insert({
      username: user.getUsername(),
      email: user.getEmail(),
      password: await hash(password),
    })
    return insertedUser
  }
}

import makeFakeUser from '../../../__test__/fixtures/user'
import makeRegisterUser from './register-user'


describe('use case register user', () => {
  const hash = (str) => "hashedString"
  const makeUserWithPassword = (overrides) => ({
    password:'pass',
    passwordConfirmation: 'pass',
    ...makeFakeUser(),
    ...overrides
  })
  const userDbBase = {
    insert: c => c,
    findByEmail: () => false,
    findByUsername: () => false
  }
  it('inserts user in the database', async () => {
    const newUser = makeUserWithPassword()
    const registerUser = makeRegisterUser({ userDb: userDbBase, hash })
    const insertedUser = await registerUser(newUser)
    const { password, passwordConfirmation, ...expectedUser } = newUser
    expect(insertedUser).toEqual(expectedUser)
  })
  it('should not return the passwor', async () => {
    const newUser = makeUserWithPassword()
    const registerUser = makeRegisterUser({ userDb: userDbBase, hash })
    const insertedUser = await registerUser(newUser)
    const { password, passwordConfirmation, ...expectedUser } = newUser
    expect(insertedUser.password).toBe(undefined)
  })
  it('email must be unique', async () => {
    const newUser = makeUserWithPassword()
    const userDb = {
      ...userDbBase,
      findByEmail: () => true,
    }
    const registerUser = makeRegisterUser({ userDb, hash })
    await expect(registerUser(newUser)).rejects.toThrow('This email is already associated with an account.')
  })
  it('username must be unique', async () => {
    const newUser = makeUserWithPassword()
    const userDb = {
      ...userDbBase,
      findByUsername: () => true,
    }
    const registerUser = makeRegisterUser({ userDb, hash })
    await expect(registerUser(newUser)).rejects.toThrow('This username is already taken.')
  })
  it('password must not be empty', async () => {
    const newUser = makeUserWithPassword({ password:'', passwordConfirmation: ''})
    const registerUser = makeRegisterUser({ userDb: userDbBase, hash })
    await expect(registerUser(newUser)).rejects.toThrow('The password cannot be empty.')
  })
  it('password must not be null', async () => {
    const { password, passwordConfirmation, ...newUser } = makeUserWithPassword()
    const registerUser = makeRegisterUser({ userDb: userDbBase, hash })
    await expect(registerUser(newUser)).rejects.toThrow('The password cannot be empty.')
  })
  it('password and password confirmation must be equal', async () => {
    const newUser = { ...makeFakeUser(), password: 'pass', passwordConfirmation: 'other'}
    const registerUser = makeRegisterUser({ userDb: userDbBase, hash })
    await expect(registerUser(newUser)).rejects.toThrow('The password confirmation does not match the password.')
  })
  it('should insert hashed password', async () => {
    const newUser = makeUserWithPassword()
    const hashedPassword = hash(newUser.password)
    const userDb = {
      //IMPORTANT : this line must be the first of the object !
      ...userDbBase,
      //IMPORTANT END
      insert: (user) => {
        expect(user.password).toStrictEqual(hashedPassword)
        return user
      }
    }
    jest.spyOn(userDb, 'insert')
    const registerUser = makeRegisterUser({ userDb, hash })
    await registerUser(newUser)
    expect(userDb.insert).toBeCalled()
  })
})

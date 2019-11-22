import makeDb from '../../__test__/fixtures/db'
import makeUsersDb from './user-db'
import makeFakeUser from '../../__test__/fixtures/user'

describe('user-db', () => {
  let userDb

  beforeEach(async () => {
    userDb = makeUsersDb({ makeDb })
  })

  it('inserts an user', async () => {
    const user = makeFakeUser()
    const {id, ...result} = await userDb.insert(user)
    return expect(result).toEqual(user)
  })

  it('lists users', async () => {
    const inserts = await Promise.all(
      [makeFakeUser(), makeFakeUser(), makeFakeUser()].map(userDb.insert)
    )
    const found = await userDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })
  it('finds by id', async () => {
    const inserts = await Promise.all(
      [makeFakeUser(), makeFakeUser(), makeFakeUser()].map(userDb.insert)
    )
    const found = await userDb.findById(inserts[0].id)
    return expect(found).toStrictEqual(inserts[0])
  })

  it('finds by email', async () => {
    const inserts = await Promise.all(
      [makeFakeUser(), makeFakeUser(), makeFakeUser()].map(userDb.insert)
    )
    const found = await userDb.findByEmail(inserts[0].email)
    return expect(found).toStrictEqual(inserts[0])
  })

  it('finds by username', async () => {
    const inserts = await Promise.all(
      [makeFakeUser(), makeFakeUser(), makeFakeUser()].map(userDb.insert)
    )
    const found = await userDb.findByUsername(inserts[0].username)
    return expect(found).toStrictEqual(inserts[0])
  })
})

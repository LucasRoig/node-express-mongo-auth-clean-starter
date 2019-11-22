import makeUser from './index'
import makeFakeUser from '../../../__test__/fixtures/user'
describe('user', () => {
  it('must have an username', () => {
    let user = makeFakeUser({username: null})
    expect(() => makeUser(user)).toThrow('User must have an username.')
  })

  it('must have an email', () => {
    let user = makeFakeUser({email: null})
    expect(() => makeUser(user)).toThrow('User must have an email.')
  })
})

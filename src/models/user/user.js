export default function buildMakeUser () {
  return function makeUser ({
    username,
    email
  } = {}) {
    if (!username) {
      throw new Error('User must have an username.')
    }
    if (!email) {
      throw new Error('User must have an email.')
    }

    return Object.freeze({
      getUsername: () => username,
      getEmail: () => email,
    })
  }
}

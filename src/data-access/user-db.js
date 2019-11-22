import Id from '../Id'
import makeRepository from './repository'
const COLLECTION_NAME = "users"

export default function makeUsersDb ({ makeDb }) {
  const repository = makeRepository({ makeDb, collectionName: COLLECTION_NAME})

  return Object.freeze({
    findAll: repository.findAll,
    insert: repository.insert,
    findById: repository.findById,
    findByEmail: (email) => repository.findOneByQuery({ email }),
    findByUsername: (username) => repository.findOneByQuery( { username })
  })
}


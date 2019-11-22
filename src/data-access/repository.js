import Id from '../Id'
export default function makeRepository ({ makeDb, collectionName }) {
  return Object.freeze({
    findAll,
    insert,
    findByQuery,
    findOneByQuery,
    findById,

  })
  async function findAll () {
    const db = await makeDb()
    const result = await db.collection(collectionName).find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findByQuery (query) {
    const db = await makeDb()
    const result = await db.collection(collectionName).find(query)
    const debug = await findAll()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findOneByQuery (query) {
    const result =  await findByQuery(query)
    if (result.length === 0) {
      return null
    }
    return result[0]
  }
  async function findById (_id) {
    return findOneByQuery({ _id })
  }
  async function insert ({ id: _id = Id.makeId(), ...infos }) {
    const db = await makeDb()
    const result = await db.collection(collectionName).insertOne({ _id: _id, ...infos })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo}
  }
}

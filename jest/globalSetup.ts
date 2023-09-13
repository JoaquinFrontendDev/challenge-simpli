// globalSetup.ts
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

module.exports = async () => {
  await mongod.start()
  const uri = await mongod.getUri()

  // Guarda la instancia de mongod en una variable global
  global.__MONGOD_INSTANCE__ = mongod

  process.env.MONGO_URI = uri
}

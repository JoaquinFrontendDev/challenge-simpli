// globalTeardown.ts
module.exports = async () => {
  const mongod = global.__MONGOD_INSTANCE__
  if (mongod?.stop) {
    await mongod.stop()
  }
}

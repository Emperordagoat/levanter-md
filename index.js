const { Client } = require('./lib/client')
const { DATABASE, VERSION, D } = require('./config')
const { stopInstance } = require('./lib/pm2')

const start = async () => {
  logger.info(`levanter ${VERSION}`)
  try {
    await DATABASE.authenticate()
    await DATABASE.sync()
    logger.info('Database syncing...')
  } catch (error) {
    console.error('Unable to connect to the database:', error.message, process.env.DATABASE_URL)
    stopInstance()
  }
  try {
    const bot = new Client()
    await bot.init()
    await bot.connect()
  } catch (error) {
    logger.error(error)
  }
}
start()

const { Client } = require('./lib/client')
const { DATABASE, VERSION } = require('./config')
const start = async () => {
	try {
		logger.info(`levanter ${VERSION}`)
		await DATABASE.sync()
		logger.info('Database syncing...')
		const bot = new Client()
		await bot.connect()
	} catch (error) {
		logger.error(error)
	}
}
start()

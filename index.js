const { Client } = require('./lib/client')
const { DATABASE, VERSION } = require('./config')
const { stopInstance } = require('./lib/pm2')

const start = async () => {
	try {
		logger.info(`levanter ${VERSION}`)
		try {
			await DATABASE.authenticate()
		} catch (error) {
			console.error('Unable to connect to the database:', error)
			stopInstance()
		}
		await DATABASE.sync()
		logger.info('Database syncing...')
		const bot = new Client()
		await bot.init()
		await bot.connect()
	} catch (error) {
		logger.error(error)
	}
}
start()

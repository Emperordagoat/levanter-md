const { Client } = require('./lib/client')
const { DATABASE, VERSION } = require('./config')
const start = async () => {
	try {
		console.log(`levanter ${VERSION}`)
		await DATABASE.sync()
		console.log('Database syncing...')
		const bot = new Client()
		await bot.connect()
	} catch (error) {
		console.error(error)
	}
}
start()

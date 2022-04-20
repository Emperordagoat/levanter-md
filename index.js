const client = require('./lib/client')
const { DATABASE } = require('./config')
const start = async () => {
	try {
		console.log('wa-bot')
		await DATABASE.sync()
		console.log('DB syncing')
		await client.connect()
	} catch (error) {
		console.error(error)
	}
}
start()

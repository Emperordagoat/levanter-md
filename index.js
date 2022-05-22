const client = require('./lib/client')
const { DATABASE, VERSION } = require('./config')
const start = async () => {
	try {
		console.log(`levanter ${VERSION}`)
		await DATABASE.sync()
		console.log('DB syncing')
		await client.connect()
	} catch (error) {
		console.error(error)
	}
}
start()

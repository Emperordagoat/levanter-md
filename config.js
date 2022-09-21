const toBool = (x) => x == 'true'
const { Sequelize } = require('sequelize')
const { existsSync } = require('fs')
if (existsSync('config.env')) require('dotenv').config({ path: './config.env' })
const DATABASE_URL =
	process.env.DATABASE_URL === undefined
		? './database.db'
		: process.env.DATABASE_URL
module.exports = {
	VERSION: require('./package.json').version,
	SESSION_ID: (process.env.SESSION_ID || '').trim(),
	DATABASE:
		DATABASE_URL === './database.db'
			? new Sequelize({
					dialect: 'sqlite',
					storage: DATABASE_URL,
					logging: false,
			  })
			: new Sequelize(DATABASE_URL, {
					dialect: 'postgres',
					ssl: true,
					protocol: 'postgres',
					dialectOptions: {
						native: true,
						ssl: { require: true, rejectUnauthorized: false },
					},
					logging: false,
			  }),
	HANDLERS: (process.env.PREFIX || '^[.,!]').trim(),
	SUDO: process.env.SUDO || '',
	HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
	HEROKU_API_KEY: process.env.HEROKU_API_KEY,
	BRANCH: 'master',
	STICKER_PACKNAME: process.env.STICKER_PACKNAME || '❤️,LyFE',
	ALWAYS_ONLINE: toBool(process.env.ALWAYS_ONLINE),
	LOG_MSG: toBool(process.env.LOG_MSG) || false,
	RMBG_KEY: process.env.RMBG_KEY || 'null',
	BAILEYS_LOG_LVL: process.env.BAILEYS_LOG_LVL || 'silent',
	LANG: (process.env.LANGUAG || 'en').toLowerCase(),
	WARN_LIMIT: process.env.WARN_LIMIT || 3,
	FORCE_LOGOUT: toBool(process.env.FORCE_LOGOUT),
	BRAINSHOP: process.env.BRAINSHOP || '159501,6pq8dPiYt7PdqHz3',
	DIS_BOT: process.env.DISABLE_BOT || 'null',
	ANTILINK_MSG:
		process.env.ANTILINK_MSG || '_Antilink Detected &mention kicked_',
	ANTISPAM_MSG:
		process.env.ANTISPAM_MSG || '_Antispam Detected &mention kicked_',
	ANTIWORDS_MSG:
		process.env.ANTIWORDS_MSG || '_AntiWord Detected &mention kicked_',
	ANTIWORDS: process.env.ANTIWORDS || 'word',
	MENTION: process.env.MENTION || '',
	SS_TOKEN: process.env.SS_TOKEN || '',
	MAX_UPLOAD: process.env.MAX_UPLOAD || 230,
}

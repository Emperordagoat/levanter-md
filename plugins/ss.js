const config = require('../config')
const { bot, isUrl } = require('../lib/')

bot(
	{
		pattern: 'ss ?(.*)',
		fromMe: true,
		desc: 'Take web page screenshot',
		type: 'download',
	},
	async (message, match) => {
		if (!config.SS_TOKEN)
			return await message.send(
				'set SS_TOKEN:your_token from https://app.screenshotapi.net/dashboard'
			)
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('_Example : ss url_')
		await message.sendFromUrl(
			`https://shot.screenshotapi.net/screenshot?token=${
				config.SS_TOKEN
			}&url=${encodeURIComponent(
				match
			)}&width=1366&height=768&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`
		)
	}
)

bot(
	{
		pattern: 'fullss ?(.*)',
		fromMe: true,
		desc: 'Take web page screenshot',
		type: 'download',
	},
	async (message, match) => {
		if (!config.SS_TOKEN)
			return await message.send(
				'set SS_TOKEN:your_token from https://app.screenshotapi.net/dashboard'
			)
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('_Example : fullss url_')
		await message.sendFromUrl(
			`https://shot.screenshotapi.net/screenshot?token=${
				config.SS_TOKEN
			}&url=${encodeURIComponent(
				match
			)}&width=1366&height=768&full_page=true&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`
		)
	}
)

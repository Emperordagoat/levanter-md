const { bot, getBuffer } = require('../lib/')

bot(
	{
		pattern: 'ss ?(.*)',
		fromMe: true,
		desc: 'Take web page screenshot',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match) return await message.sendMessage('_Example : ss url_')
		const { buffer, mimetype, type } = await getBuffer(
			`https://shot.screenshotapi.net/screenshot?&url=${match}&fresh=true&output=image&file_type=png&block_ads=true&no_cookie_banners=true&destroy_screenshot=true&dark_mode=true&wait_for_event=networkidle`,
			false
		)
		return await message.sendMessage(
			buffer,
			{ mimetype, quoted: message.data },
			type
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
		match = match || message.reply_message.text
		if (!match) return await message.sendMessage('_Example : fullsss url_')
		const { buffer, mimetype, type } = await getBuffer(
			`https://shot.screenshotapi.net/screenshot?&url=${match}&full_page=true&output=image&file_type=png&block_ads=true&no_cookie_banners=true&destroy_screenshot=true&dark_mode=true&wait_for_event=networkidle`,
			false
		)
		return await message.sendMessage(
			buffer,
			{ mimetype, quoted: message.data },
			type
		)
	}
)

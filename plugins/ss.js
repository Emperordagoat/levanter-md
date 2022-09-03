const { bot, isUrl } = require('../lib/')

bot(
	{
		pattern: 'ss ?(.*)',
		fromMe: true,
		desc: 'Take web page screenshot',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('_Example : ss url_')
		await message.sendFromUrl(
			`https://shot.screenshotapi.net/screenshot?token=DEN1B1Y-GWX4KMR-HGVBH74-W2093ZW&url=${encodeURIComponent(
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
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('_Example : fullss url_')
		await message.sendFromUrl(
			`https://shot.screenshotapi.net/screenshot?token=DEN1B1Y-GWX4KMR-HGVBH74-W2093ZW&url=${encodeURIComponent(
				match
			)}&width=1366&height=768&full_page=true&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`
		)
	}
)

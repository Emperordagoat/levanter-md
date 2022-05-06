const { bot, isUrl } = require('../lib/')

bot(
	{
		pattern: 'ss ?(.*)',
		fromMe: true,
		desc: 'Download pinterest video/image',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.sendMessage('_Example : ss url_')
		return await message.sendFromUrl(`https://shot.screenshotapi.net/screenshot?&url=${match}
		&width=1388&height=720&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`)
	}
)

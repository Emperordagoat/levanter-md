const { bot, buttonMessage } = require('../lib')

bot(
	{
		pattern: 'button ?(.*)',
		fromMe: true,
		desc: 'button msg',
		type: 'whatsapp',
	},
	async (message, match) => {
		match = match.split(',')
		if (match.length < 3)
			return await message.sendMessage(
				'Example head,foot,button1,button2,...\nreply to image,video or document.'
			)
		await message.sendMessage(await buttonMessage(match, message), {}, 'button')
	}
)

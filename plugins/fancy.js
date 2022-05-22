const { bot, textToStylist, fontType, stylishTextGen } = require('../lib')
bot(
	{
		pattern: 'fancy ?(.*)',
		fromMe: true,
		desc: 'Creates fancy text from given text',
		type: 'misc',
	},
	async (message, match) => {
		if (message.reply_message.text) {
			if (!match || isNaN(match) || match < 1 || match > 39)
				return await message.sendMessage('Chooose font\n Ex: fancy 7')
			return await message.sendMessage(
				textToStylist(message.reply_message.text, fontType(match))
			)
		}
		return await message.sendMessage(stylishTextGen(match))
	}
)

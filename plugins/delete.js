const { bot, setVar } = require('../lib/index')

bot(
	{
		pattern: 'delete ?(.*)',
		fromMe: true,
		desc: 'anti delete',
		type: 'whatsapp',
	},
	async (message, match) => {
		if (!match || (match != 'p' && match != 'g' && match != 'null'))
			return await message.send(
				"*Anti delete Message*\n*Example :* delete p | g | null\n p - Send deleted messages to your chat or sudo\n g - Send deleted Message on chat where it delete\n null - Don't do anything with delete (off)"
			)
		await setVar({ ANTI_DELETE: match })
		const msg =
			match == 'null'
				? '_Anti delete Disabled_'
				: match == 'p'
				? '_Deleted Messages send to your chat or sudo_'
				: '_Deleted Messages send to the chat itself_'
		await message.send(msg)
	}
)

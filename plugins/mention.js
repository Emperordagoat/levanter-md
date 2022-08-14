const {
	bot,
	genHydratedButtons,
	mentionMessage,
	enableMention,
	clearFiles,
} = require('../lib/')

bot(
	{
		pattern: 'mention ?(.*)',
		fromMe: true,
		desc: 'To set and Manage mention',
		type: 'misc',
	},
	async (message, match) => {
		if (!match)
			return await message.send(
				await genHydratedButtons(
					[
						{
							urlButton: {
								text: 'example',
								url: 'https://github.com/lyfe00011//whatsapp-bot-md/wiki/mention_example',
							},
						},
						{ button: { id: 'mention on', text: 'ON' } },
						{ button: { id: 'mention off', text: 'OFF' } },
						{ button: { id: 'mention get', text: 'GET' } },
					],
					'Mention Msg Manager'
				),
				{},
				'template'
			)
		if (match == 'get') {
			const msg = await mentionMessage()
			if (!msg)
				return await message.send('_Reply to Mention not Activated._')
			return await message.send(msg)
		} else if (match == 'on' || match == 'off') {
			await enableMention(match == 'on')
			return await message.send(
				`_Reply to mention ${match == 'on' ? 'Activated' : 'Deactivated'}_`
			)
		}
		await enableMention(match)
		clearFiles()
		return await message.send('_Mention Updated_')
	}
)

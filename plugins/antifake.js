const {
	bot,
	getFake,
	antiList,
	enableAntiFake,
	genButtonMessage,
} = require('../lib/')

bot(
	{
		pattern: 'antifake ?(.*)',
		fromMe: true,
		desc: 'set antifake',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		if (!match) {
			const fake = await getFake(message.jid)
			const onOrOff = fake && fake.enabled ? 'off' : 'on'
			const button = await genButtonMessage(
				[
					{ id: 'antifake list', text: 'LIST' },
					{ id: `antifake ${onOrOff}`, text: onOrOff.toUpperCase() },
				],
				'Example\nhttps://github.com/lyfe00011/whatsapp-bot-md/wiki/antifake',
				'Antifake'
			)
			return await message.send(button, {}, 'button')
			// return await message.send(
			// 	await genHydratedButtons(
			// 		[
			// 			{
			// 				urlButton: {
			// 					text: 'Example',
			// 					url: 'https://github.com/lyfe00011/whatsapp-bot-md/wiki/antifake',
			// 				},
			// 			},
			// 			{ button: { id: 'antifake list', text: 'LIST' } },
			// 			{ button: { id: 'antifake on', text: 'ON' } },
			// 			{ button: { id: 'antifake off', text: 'OFF' } },
			// 		],
			// 		'Antifake'
			// 	),
			// 	{},
			// 	'template'
			// )
		}
		if (match == 'list') {
			let list = ''
			let codes = await antiList(message.jid, 'fake')
			await message.send(codes.join(','))
			codes.forEach((code, i) => {
				list += `${i + 1}. ${code}\n`
			})
			return await message.send('```' + list + '```')
		}
		if (match == 'on' || match == 'off') {
			await enableAntiFake(message.jid, match)
			return await message.send(
				`_Antifake ${match == 'on' ? 'Activated' : 'Deactivated'}_`
			)
		}
		await enableAntiFake(message.jid, match)
		return await message.send('_Antifake Updated_')
	}
)

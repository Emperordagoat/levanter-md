const { getAntiLink, bot, genHydratedButtons, setAntiLink } = require('../lib/')

bot(
	{
		pattern: 'antilink ?(.*)',
		fromMe: true,
		desc: 'to on off antiLink',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const antilink = await getAntiLink(message.jid)
		if (!match)
			return await message.sendMessage(
				await genHydratedButtons(
					[
						{
							urlButton: {
								text: 'Example',
								url: 'https://github.com/lyfe00011/whatsapp-bot-md/wiki/antilink',
							},
						},
						{
							button: {
								id: `antilink ${antilink.enabled ? 'off' : 'on'}`,
								text: antilink.enabled ? 'OFF' : 'ON',
							},
						},
						{ button: { id: 'antilink info', text: 'INFO' } },
					],
					'Antifake'
				),
				{},
				'template'
			)
		if (match == 'on' || match == 'off') {
			if (match == 'off' && !antilink)
				return await message.sendMessage('_AntiLink is not enabled._')
			await setAntiLink(message.jid, match == 'on')
			return await message.sendMessage(
				`_AntiLink ${match == 'on' ? 'Enabled' : 'Disabled.'}_`
			)
		}
		if (match == 'info')
			return await message.sendMessage(
				`*AntiLink :* ${antilink.enabled ? 'on' : 'off'}\n*AllowedUrl :* ${
					antilink.allowedUrls
				}\n*Action :* ${antilink.action ? 'kick' : 'warn'}`
			)
		if (match.startsWith('action/')) {
			await setAntiLink(message.jid, match)
			return await message.sendMessage(
				`_AntiLink action updated as ${
					match == 'action/kick' ? 'kick' : 'warn'
				}_`
			)
		}
		await setAntiLink(message.jid, match)
		return await message.sendMessage(`_AntiLink allowed urls are ${match}_`)
	}
)

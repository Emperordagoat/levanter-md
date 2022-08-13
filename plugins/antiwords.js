const { bot, setWord, getWord, genButtonMessage } = require('../lib')

const actions = ['null', 'warn', 'kick']

bot(
	{
		pattern: 'antiword ?(.*)',
		fromMe: true,
		desc: 'filter the group chat',
		onlyGroup: true,
		type: 'group',
	},
	async (message, match) => {
		if (
			!match ||
			(match != 'on' && match != 'off' && !match.startsWith('action'))
		) {
			const { enabled, action } = await getWord(message.jid)
			const buttons = actions
				.filter((e) => e != action)
				.map((button) => ({
					text: button,
					id: `antiword action/${button}`,
				}))
			buttons.push({
				text: enabled ? 'OFF' : 'ON',
				id: `antiword ${enabled ? 'off' : 'on'}`,
			})
			return await message.sendMessage(
				await genButtonMessage(
					buttons,
					'AntiWord\nExample : antiword on/off\nantiword action/null or kick or warn'
				),
				{},
				'button'
			)
		}
		if (match.startsWith('action/')) {
			const action = match.replace('action/', '')
			if (!actions.includes(action))
				return await message.sendMessage(`${action} _is a invalid action_`)
			await setWord(message.jid, action)
			return await message.sendMessage(`_antiword action updated as ${action}_`)
		}
		await setWord(message.jid, match == 'on')
		await message.sendMessage(
			`_AntiWord ${match == 'on' ? 'activated' : 'deactivated.'}_`
		)
	}
)

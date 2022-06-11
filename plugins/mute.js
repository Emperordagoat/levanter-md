const {
	bot,
	isAdmin,
	setMute,
	addTask,
	genButtonMessage,
	c24to12,
} = require('../lib')

bot(
	{
		pattern: 'amute ?(.*)',
		fromMe: true,
		desc: 'auto group mute scheduler',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const participants = await message.groupMetadata(message.jid)
		const isImAdmin = await isAdmin(participants, message.client.user.jid)
		if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
		let msg = message.reply_message.text || 'null'

		const [hour, min] = match.split(' ')
		if (hour == 'on' || hour == 'off') {
			const is = await setMute(message.jid, 'mute', hour == 'on')
			if (!is) return await message.sendMessage('_Not enabled_')
			addTask(message.jid, 'mute', hr)
			await message.sendMessage('_enabled_')
		}
		if (!hour || !min || isNaN(hour) || isNaN(min))
			return await message.sendMessage(await '*Example : amute 22 30*')
		await setMute(message.jid, 'mute', true, hour, min, msg)
		addTask(message.jid, 'mute', hour, min, message.client, msg)

		return await message.sendMessage(
			`_Group will Mute at ${c24to12(`${hour}:${min}`)}${
				msg != 'null' ? `\nMessage: ${msg}` : ''
			}_`
		)
	}
)

bot(
	{
		pattern: 'aunmute ?(.*)',
		fromMe: true,
		desc: 'auto group unmute scheduler',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const participants = await message.groupMetadata(message.jid)
		const isImAdmin = await isAdmin(participants, message.client.user.jid)
		if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
		let msg = message.reply_message.text || 'null'

		const [hour, min] = match.split(' ')
		if (hour == 'on' || hour == 'off') {
			const is = await setMute(message.jid, 'unmute', hour == 'on')
			if (!is) return await message.sendMessage('_Not enabled_')
			addTask(message.jid, 'unmute', hr)
			await message.sendMessage('_enabled_')
		}
		if (!hour || !min || isNaN(hour) || isNaN(min))
			return await message.sendMessage(
				await genButtonMessage(
					[
						{ id: 'aunmute on', text: 'ON' },
						{ id: 'aunmute off', text: 'OFF' },
					],
					'*Example : aunmute 6 0*'
				)
			)
		await setMute(message.jid, 'unmute', true, hour, min, msg)
		addTask(message.jid, 'unmute', hour, min, message.client, msg)
		return await message.sendMessage(
			`_Group will unMute at ${c24to12(`${hour}:${min}`)}${
				msg != 'null' ? `\nMessage: ${msg}` : ''
			}_`
		)
	}
)

const { bot, isAdmin } = require('../lib')

bot(
	{
		pattern: 'dlt ?(.*)',
		fromMe: true,
		desc: 'delete replied msg',
		type: 'whatsapp',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.sendMessage('*Reply to a message*')
		const key = message.reply_message.key
		if (!key.fromMe && message.isGroup) {
			const participants = await message.groupMetadata(message.jid)
			const isImAdmin = await isAdmin(participants, message.client.user.jid)
			if (!isImAdmin) return await message.sendMessage(`_I'm not admin._`)
		}
		return await message.sendMessage(key, {}, 'delete')
	}
)

const { bot, getBuffer } = require('../lib/')
const fm = true

bot(
	{
		pattern: 'jid',
		fromMe: fm,
		desc: 'Give jid of chat/user',
		type: 'misc',
	},
	async (message, match) => {
		return await message.sendMessage(
			message.mention[0] || message.reply_message.jid || message.jid
		)
	}
)

bot(
	{
		pattern: 'left',
		fromMe: fm,
		dec: 'To leave from group',
		type: 'misc',
		onlyGroup: true,
	},
	async (message, match) => {
		if (match) await message.sendMessage(match)
		return await message.leftFromGroup(message.jid)
	}
)

bot(
	{
		pattern: 'block',
		fromMe: fm,
		desc: 'Block a person',
		type: 'misc',
	},
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.sendMessage('*Give me a person*')
		await message.sendMessage('_Blocked_')
		await message.Block(id)
	}
)

bot(
	{
		pattern: 'unblock',
		fromMe: fm,
		desc: 'Unblock a person',
		type: 'misc',
	},
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.sendMessage('*Give me a person*')
		await message.sendMessage('_Unblocked_')
		await message.Unblock(id)
	}
)

bot(
	{
		pattern: 'pp',
		fromMe: fm,
		desc: 'Change Profile Picture',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.sendMessage('*Reply to a image*')
		await message.updateProfilePicture(
			await message.reply_message.downloadMediaMessage()
		)
		return await message.sendMessage('_Profile Picture Updated_')
	}
)

bot(
	{
		pattern: 'whois',
		fromMe: fm,
		desc: 'To get PP and about',
		type: 'misc',
	},
	async (message, match) => {
		const id = message.mention[0] || message.reply_message.jid || message.jid
		const url = await message.profilePictureUrl(id)
		const { status } = await message.fetchStatus(id)
		const { buffer } = await getBuffer(url)
		return await message.sendMessage(buffer, { caption: status }, 'image')
	}
)

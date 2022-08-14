const { bot, getBuffer } = require('../lib/')
const fm = true

bot(
	{
		pattern: 'jid',
		fromMe: fm,
		desc: 'Give jid of chat/user',
		type: 'user',
	},
	async (message, match) => {
		return await message.send(
			message.mention[0] || message.reply_message.jid || message.jid
		)
	}
)

bot(
	{
		pattern: 'left',
		fromMe: fm,
		dec: 'To leave from group',
		type: 'user',
		onlyGroup: true,
	},
	async (message, match) => {
		if (match) await message.send(match)
		return await message.leftFromGroup(message.jid)
	}
)

bot(
	{
		pattern: 'block',
		fromMe: fm,
		desc: 'Block a person',
		type: 'user',
	},
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.send('*Give me a person*')
		await message.send('_Blocked_')
		await message.Block(id)
	}
)

bot(
	{
		pattern: 'unblock',
		fromMe: fm,
		desc: 'Unblock a person',
		type: 'user',
	},
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.send('*Give me a person*')
		await message.send('_Unblocked_')
		await message.Unblock(id)
	}
)

bot(
	{
		pattern: 'pp',
		fromMe: fm,
		desc: 'Change Profile Picture',
		type: 'user',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('*Reply to a image*')
		await message.updateProfilePicture(
			await message.reply_message.downloadMediaMessage()
		)
		return await message.send('_Profile Picture Updated_')
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
		return await message.send(buffer, { caption: status }, 'image')
	}
)

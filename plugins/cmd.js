const { setCmd, bot, getCmd, delCmd } = require('../lib/index')

bot(
	{
		pattern: 'setcmd ?(.*)',
		fromMe: true,
		desc: 'to set cmd',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.sticker)
			return await message.sendMessage('*Reply to a sticker*')
		if (!match) return await message.sendMessage('*Example : setcmd ping*')
		const res = await setCmd(match, message.reply_message)
		return await message.sendMessage(res < 1 ? '_Failed_' : '_Success_')
	}
)

bot(
	{
		pattern: 'getcmd ?(.*)',
		fromMe: true,
		desc: 'to get cmd',
		type: 'misc',
	},
	async (message, match) => {
		const res = await getCmd()
		if (!res.length) return await message.sendMessage('*Not set any cmds*')
		return await message.sendMessage('```' + res.join('\n') + '```')
	}
)

bot(
	{
		pattern: 'delcmd ?(.*)',
		fromMe: true,
		desc: 'to del cmd',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.sticker)
			return await message.sendMessage('*Reply to a sticker*')
		const res = await delCmd(message.reply_message)
		return await message.sendMessage(res < 1 ? '_Failed_' : '_Success_')
	}
)

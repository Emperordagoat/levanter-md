const { bot, newVote, participateInVote } = require('../lib/')

bot(
	{
		pattern: 'vote ?(.*)',
		fromMe: true,
		desc: 'poll in whatsapp',
		type: 'group',
	},
	async (message, match) => {
		const { msg, options, type } = await newVote(message, match)
		return await message.send(msg, options, type)
	}
)

bot({ on: 'text', fromMe: false, type: 'vote' }, async (message, match) => {
	const msg = await participateInVote(message)
	if (msg)
		return await message.send(
			msg.msg,
			{ quoted: message.data },
			msg.type
		)
})

const {
	bot,
	isTactacToe,
	ticTacToe,
	delTicTacToe,
	genButtonMessage,
	isUser,
} = require('../lib/')

bot(
	{
		pattern: 'tictactoe ?(.*)',
		fromMe: true,
		desc: 'TicTacToe Game.',
		type: 'game',
	},
	async (message, match) => {
		if (match == 'end') {
			await delTicTacToe()
			return await message.send('*Game ended*')
		}
		let [restart, id] = match.split(' ')
		const game = isTactacToe()
		if (game.state && !match)
			return await message.send(
				await genButtonMessage(
					[{ id: 'tictactoe end', text: 'END' }],
					game.text,
					'Choose Number from 1-9 to Play'
				),
				{ contextInfo: { mentionedJid: game.mentionedJid } },
				'button'
			)
		let opponent = message.mention[0] || message.reply_message.jid
		if (restart == 'restart' && isUser(id)) {
			opponent = id
			await delTicTacToe()
		}
		if (!opponent || opponent == message.participant)
			return await message.send(
				'*Choose an Opponent, Reply to a message or mention*'
			)
		const { text } = await ticTacToe(message.jid, message.participant, opponent)
		return await message.send(text, {
			contextInfo: { mentionedJid: [message.participant, opponent] },
		})
	}
)

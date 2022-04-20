const bot = require('../lib/events')
const { ctt, addSpace, textToStylist } = require('../lib/')

bot.addCommand(
	{ pattern: 'menu ?(.*)', fromMe: true, dontAddCommandList: true },
	async (message, match) => {
		let CMD_HELP = `╭────────────────╮
    				ᴡᴀ-ʙᴏᴛ
╰────────────────╯

╭────────────────
`
		const commands = []
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				commands.push(ctt(command.pattern))
			}
		})
		commands.forEach((command, i) => {
			CMD_HELP += `│ ${i + 1} ${addSpace(
				i + 1,
				commands.length
			)}${textToStylist(command.toUpperCase(), 'mono')}\n`
		})
		CMD_HELP += `╰────────────────`
		return await message.sendMessage('```' + CMD_HELP + '```')
	}
)

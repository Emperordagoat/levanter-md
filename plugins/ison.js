const { bot, PREFIX, getNumbers, sleep, jidToNum } = require('../lib')

bot(
	{
		pattern: 'ison ?(.*)',
		fromMe: true,
		desc: 'List number in whatsapp',
		type: 'search',
	},
	async (message, match) => {
		if (!match) return message.send(`*Example :* ${PREFIX}ison 9198765432x0`)
		const numbers = getNumbers(match)
		const not = []
		const x403 = []
		const exist = []
		for (const number of numbers) {
			const ison = await message.onWhatsapp(number)
			await sleep(321)
			if (!ison) {
				not.push(number)
				continue
			}
			const about = await message.fetchStatus(ison)
			await sleep(639)
			if (!about) {
				x403.push(number)
				continue
			}
			exist.push(about)
		}
		let msg = ''
		if (not.length) {
			msg += `*Not Exist on Whatsapp* (${not.length})\n`
			for (const num of not) msg += `+${num}\n`
		}
		if (exist.length) {
			msg += `\n*Exist on Whatsapp* (${exist.length})\n`
			for (const about of exist) {
				const num = jidToNum(about.id)
				msg += `@${num}\n*Number :* +${num}\n*About :* ${about.status}\n*Date :* ${about.date}\n\n`
			}
		}
		if (x403.length) {
			msg += `*Privacy Settings on* (${x403.length})\n`
			for (const num of x403) msg += `+${num}\n`
		}
		const mentionedJid = exist.map((user) => user.id)
		return await message.send(msg.trim(), { contextInfo: { mentionedJid } })
	}
)

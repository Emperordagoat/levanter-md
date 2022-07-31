const {
	bot,
	getMsg,
	jidToNum,
	resetMsgs,
	getFloor,
	sleep,
	secondsToHms,
} = require('../lib')

bot(
	{
		pattern: 'msgs ?(.*)',
		fromMe: true,
		desc: 'shows groups message count',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const user = message.mention[0] || message.reply_message.jid
		const { participants } = await getMsg(message.jid, user)
		let msg = ''
		const now = new Date().getTime()
		for (const participant in participants) {
			msg += `*Number :* ${jidToNum(participant)}\n*Name :* ${
				participants[participant].name || ''
			}\n*Total Msgs :* ${participants[participant].total}\n`
			const { type } = participants[participant]
			for (const item in type) msg += `*${item} :* ${type[item]}\n`
			msg += `*lastSeen :* ${secondsToHms(
				(now - participant[1].time) / 1000
			)} ago\n\n`
		}
		await message.sendMessage(msg.trim())
	}
)

bot(
	{
		pattern: 'reset ?(.*)',
		fromMe: true,
		desc: 'reset groups message count',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const user = message.reply_message.jid || message.mention[0]
		if (!user && match != 'all')
			return await message.sendMessage(
				'*Example :*\nreset all\nreset mention/reply a person'
			)
		if (match == 'all') {
			await resetMsgs(message.jid)
			return await message.sendMessage('_Everyones message count deleted._')
		}
		await resetMsgs(message.jid, match)
		return await message.sendMessage(
			`_@${jidToNum(match)} message count deleted._`,
			{ contextInfo: { mentionedJid: [match] } }
		)
	}
)

bot(
	{
		pattern: 'inactive ?(.*)',
		fromMe: true,
		desc: 'show/kick who message count not met',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const [type, count, kick] = match.split(' ')
		if (
			!type ||
			!count ||
			(type.toLowerCase() != 'total' && type.toLowerCase() != 'day') ||
			isNaN(count)
		)
			return await message.sendMessage(
				`*Example :*\ninactive day 10\ninactive day 10 kick\ninactive total 100\ninactive total 100 kick\n\nif kick not mentioned, Just list`
			)
		const { participants } = await getMsg(message.jid)
		const now = new Date().getTime()
		const inactive = Object.entries(participants)
			.filter((participant) => {
				if (type == 'total') return participant[1].total < count
				else return getFloor((now - participant[1].time) / 1000 / 8400) > count
			})
			.map((e) => e[0])
		let msg = `_Total inactives are : ${inactive.length}_`
		if (inactive.length < 1) return await message.sendMessage(msg)
		if (kick == 'kick') {
			await message.sendMessage(
				`_Removing ${inactive.length} inactive members in 7 seconds_`
			)
			await sleep(7000)
			return await message.Kick(inactive)
		}
		for (const member of inactive) msg += `\n@${jidToNum(member)}`
		return await message.sendMessage(msg, {
			contextInfo: { mentionedJid: inactive },
		})
	}
)

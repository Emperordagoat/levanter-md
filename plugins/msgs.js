const {
	bot,
	getMsg,
	jidToNum,
	resetMsgs,
	getFloor,
	sleep,
	secondsToHms,
	isAdmin,
	addSpace,
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
			msg += `*lastSeen :* ${
				secondsToHms((now - participants[participant].time) / 1000) || 0
			} ago\n\n`
		}
		await message.send(msg.trim())
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
			return await message.send(
				'*Example :*\nreset all\nreset mention/reply a person'
			)
		if (match == 'all') {
			await resetMsgs(message.jid)
			return await message.send('_Everyones message count deleted._')
		}
		await resetMsgs(message.jid, user)
		return await message.send(
			`_@${jidToNum(user)} message count deleted._`,
			{ contextInfo: { mentionedJid: [user] } }
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
		const members = await message.groupMetadata(message.jid)
		const membersJids = members.map(({ id }) => id)
		const [type, count, kickOrType, COUNT, KICK] = match.split(' ')
		if (
			!type ||
			!count ||
			(type.toLowerCase() != 'total' && type.toLowerCase() != 'day') ||
			isNaN(count) ||
			(kickOrType && kickOrType != 'kick' && kickOrType != 'total') ||
			(COUNT && isNaN(COUNT))
		)
			return await message.send(
				`*Example :*\ninactive day 10\ninactive day 10 kick\ninactive total 100\ninactive total 100 kick\ninactive day 7 total 150\ninactive day 7 total 150 kick\n\nif kick not mentioned, Just list`
			)
		const { participants } = await getMsg(message.jid)
		const now = new Date().getTime()
		const active = Object.keys(participants)
		const inactive = Object.entries(participants)
			.filter((participant) => {
				if (!membersJids.includes(participant[0]))
					resetMsgs(message.jid, participant[0])
				if (kickOrType && kickOrType == 'total')
					return (
						participant[1].total < COUNT &&
						getFloor((now - participant[1].time) / 1000 / 8400) > count &&
						membersJids.includes(participant[0])
					)
				if (type == 'total')
					return (
						participant[1].total < count && membersJids.includes(participant[0])
					)
				else
					return (
						getFloor((now - participant[1].time) / 1000 / 8400) > count &&
						membersJids.includes(participant[0])
					)
			})
			.map((e) => e[0])
		const notText = membersJids.filter(
			(id) => !inactive.includes(id) && !active.includes(id)
		)
		const tokick = [...inactive, ...notText]
		let msg = `_Total inactives are : ${tokick.length}_`
		if (tokick.length < 1) return await message.send(msg)
		if (kickOrType == 'kick' || KICK == 'kick') {
			const isImAdmin = await isAdmin(members, message.client.user.jid)
			if (!isImAdmin) return await message.send(`_I'm not admin._`)
			await message.send(
				`_Removing ${tokick.length} inactive members in 7 seconds_`
			)
			await sleep(7000)
			return await message.Kick(tokick)
		}
		for (let i = 0; i < tokick.length; i++)
			msg += `\n*${i + 1}.*${addSpace(i + 1, tokick.length)} @${jidToNum(
				tokick[i]
			)}`
		return await message.send(msg, {
			contextInfo: { mentionedJid: tokick },
		})
	}
)

const {
	bot,
	yts,
	song,
	video,
	addAudioMetaData,
	// genListMessage,
	generateList,
} = require('../lib/')
const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

bot(
	{
		pattern: 'yts ?(.*)',
		fromMe: true,
		desc: 'YT search',
		type: 'search',
	},
	async (message, match) => {
		if (!match) return await message.send('*Example : yts baymax*')
		const vid = ytIdRegex.exec(match)
		if (vid) {
			const result = await yts(vid[1], true)
			const { title, description, duration, view, published } = result[0]
			return await message.send(
				`*Title :* ${title}\n*Time :* ${duration}\n*Views :* ${view}\n*Publish :* ${published}\n*Desc :* ${description}`
			)
		}

		const result = await yts(match)
		let msg = ''
		result.forEach(
			({ title, id, view, duration, published, author }) =>
				(msg += `• *${title.trim()}*\n*Views :* ${view}\n*Time :* ${duration}\n*Author :* ${author}\n*Published :* ${published}\n*Url :* https://www.youtube.com/watch?v=${id}\n\n`)
		)
		return await message.send(msg.trim())
	}
)

bot(
	{
		pattern: 'song ?(.*)',
		fromMe: true,
		desc: 'download yt song',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match)
			return await message.send('*Example : song indila love story/ yt link*')
		const vid = ytIdRegex.exec(match)
		if (vid) {
			const [result] = await yts(vid[1], true)
			const { id, author, title, thumbnail } = result
			return await message.send(
				await addAudioMetaData(
					await song(id),
					title,
					author,
					'',
					thumbnail.url
				),
				{ quoted: message.data, mimetype: 'audio/mpeg' },
				'audio'
			)
		}
		const result = await yts(match)
		if (!result.length) return await message.send(`_Not result for_ *${match}*`)
		const msg = generateList(
			result.map(({ title, id, duration }) => ({
				text: title + ` (${duration})\n`,
				id: `song https://www.youtube.com/watch?v=${id}`,
			})),
			`Searched ${match}\nFound ${result.length} results`,
			message.jid
		)
		return await message.send('```' + msg + '```')
		// return await message.send(
		// 	genListMessage(
		// 		result.map(({ title, id, duration }) => ({
		// 			text: title,
		// 			id: `song https://www.youtube.com/watch?v=${id}`,
		// 			desc: duration,
		// 		})),
		// 		`Searched ${match}\nFound ${result.length} results`,
		// 		'DOWNLOAD'
		// 	),
		// 	{},
		// 	'list'
		// )
	}
)

bot(
	{
		pattern: 'video ?(.*)',
		fromMe: true,
		desc: 'download yt video',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match) return await message.send('*Example : video yt_url*')
		const vid = ytIdRegex.exec(match)
		if (!vid) {
			return await message.send('*Example : video yt_url*')
			// const result = await yts(match)
			// match = result[0].id
		} else match = vid[1]
		return await message.send(
			await video(match),
			{ quoted: message.data },
			'video'
		)
	}
)

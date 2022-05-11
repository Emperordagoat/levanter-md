const {
	bot,
	yts,
	song,
	video,
	addAudioMetaData,
	genListMessage,
} = require('../lib/')
const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

bot(
	{
		pattern: 'yts ?(.*)',
		fromMe: true,
		desc: 'YT search',
		type: 'misc',
	},
	async (message, match) => {
		if (!match) return await message.sendMessage('*Example : yts darari*')
		const result = await yts(match)
		let msg = ''
		result.forEach(
			({ title, description, url }) =>
				(msg += `• ${title}\n${description}\n${url}\n\n`)
		)
		return await message.sendMessage(msg.trim())
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
		if (!match) return await message.sendMessage('*Example : song darari*')
		const vid = ytIdRegex.exec(match)
		if (vid) {
			const [result] = await yts(vid[1], true)
			const { id, author, title, thumbnail } = result
			return await message.sendMessage(
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
		} else {
			const result = await yts(match)
			return await message.sendMessage(
				genListMessage(
					result.map(({ title, url, description }) => ({
						text: title,
						id: `song ${url}`,
						desc: description,
					})),
					'Choose Your Song',
					'DOWNLOAD'
				),
				{},
				'list'
			)
		}
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
		if (!match) return await message.sendMessage('*Example : video darari*')
		const vid = ytIdRegex.exec(match)
		if (!vid) {
			const result = await yts(match)
			match = result[0].id
		} else match = vid[1]
		return await message.sendMessage(
			await video(match),
			{ quoted: message.data },
			'video'
		)
	}
)

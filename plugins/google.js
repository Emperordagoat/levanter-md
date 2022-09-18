const { bot, getUrl, googleImageSearch } = require('../lib/')

bot(
	{
		pattern: 'google ?(.*)',
		fromMe: true,
		desc: 'Google Image Search',
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('*Reply to a image*')
		const result = await googleImageSearch(
			await getUrl(
				await message.reply_message.downloadAndSaveMediaMessage('google')
			),
			'ris'
		)
		if (!result.length) return await message.send('_Not found_')
		return await message.send(result.join('\n'), {
			quoted: message.data,
		})
	}
)

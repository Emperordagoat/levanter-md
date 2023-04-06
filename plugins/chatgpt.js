const config = require('../config')
const { bot, getGPTResponse, getDallEResponse } = require('../lib')

bot(
	{
		pattern: 'gpt ?(.*)',
		fromMe: true,
		desc: 'ChatGPT fun',
		type: 'AI',
	},
	async (message, match) => {
		if (!config.GPT)
			return await message.send(
				'Get a key from https://platform.openai.com/account/api-keys\n\nsetvar GPT = your_key'
			)
		if (!match)
			return await message.send(
				'*Example : gpt What is the capital of France?*'
			)
		const res = await getGPTResponse(match)
		await message.send(res, { quoted: message.data })
	}
)

bot(
	{
		pattern: 'dall ?(.*)',
		fromMe: true,
		desc: 'dall image generator',
		type: 'AI',
	},
	async (message, match) => {
		if (!config.GPT)
			return await message.send(
				'Get a key from https://platform.openai.com/account/api-keys\n\nsetvar GPT = your_key'
			)
		if (!match)
			return await message.send(
				'*Example : dall a close up, studio photographic portrait of a white siamese cat that looks curious, backlit ears*'
			)
		const res = await getDallEResponse(match)
		await message.sendFromUrl(res)
	}
)

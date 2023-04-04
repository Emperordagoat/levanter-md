const config = require('../config')
const { bot, getGPTResponse } = require('../lib')

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
